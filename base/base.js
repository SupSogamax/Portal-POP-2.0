document.addEventListener("DOMContentLoaded", () => {
  const handlerSidebar = () => {
    const showPOPS = () => {
      document.querySelector("#pops").addEventListener("click", () => {
        document.querySelector("#sectors").classList.toggle("show");
      });
    };
    showPOPS();

    const showSETTINGS = () => {
      document.querySelector("#settings").addEventListener("click", () => {
        document.querySelector("#subListSettings").classList.toggle("show");
      });
    };
    showSETTINGS();

    const redirect = () => {
      const panels = [
        document.querySelector(".panelPrincipal"),
        document.querySelector(".panelConfirmacao"),
        document.querySelector(".panelGerenciaUser"),
        document.querySelector(".PanelCreateUser"),
        document.querySelector(".PanelMyProfile"),
        document.querySelector(".PanelUserEdit"),
        document.querySelector(".panelDetalhes"),
      ];

      const panelCard = document.querySelector(".panelPrincipal");
      const panelDetalhes = document.querySelector(".panelDetalhes");

      panels.forEach((panel) => {
        if (panel) {
          panel.style.display = "none";
          panel.classList.remove("fade-in"); // Remove fade class initially
        }
      });

      panelCard.style.display = "block";
      setTimeout(() => {
        panelCard.classList.add("fade-in");
      }, 0);

      const showPanel = (activePanel) => {
        panels.forEach((panel) => {
          if (panel === activePanel) {
            panel.style.display = "block";
            setTimeout(() => {
              panel.classList.add("fade-in");
            }, 0);
          } else {
            panel.classList.remove("fade-in");
            panel.style.display = "none";
          }
        });
      };

      document
        .querySelector("#confirm")
        ?.addEventListener("click", () =>
          showPanel(document.querySelector(".panelConfirmacao"))
        );
      document
        .querySelector("#gerenciar")
        ?.addEventListener("click", () =>
          showPanel(document.querySelector(".panelGerenciaUser"))
        );
      document
        .querySelector("#newUser")
        ?.addEventListener("click", () =>
          showPanel(document.querySelector(".PanelCreateUser"))
        );
      document
        .querySelector("#subListSettings")
        ?.addEventListener("click", () =>
          showPanel(document.querySelector(".PanelMyProfile"))
        );

      document.querySelectorAll(".view-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          showPanel(panelDetalhes);
        });
      });

      const listSide = document.querySelectorAll("#sectors li");
      const popCards = document.querySelectorAll(".pop-card");
      const departmentElement = document.getElementById("departament");
      const departments = departmentElement
        ? departmentElement.textContent.split(",").map((dep) => dep.trim())
        : [];

      popCards.forEach((card) => {
        const cardSector = card.getAttribute("data-sector");
        card.style.display = departments.includes(cardSector)
          ? "block"
          : "none";
      });

      listSide.forEach((li) => {
        const sector = li.getAttribute("data-department");
        li.style.display = departments.includes(sector) ? "block" : "none";

        li.addEventListener("click", () => {
          const selectedDepartment = li.getAttribute("data-department");

          // Filter POP cards by selected department
          popCards.forEach((card) => {
            card.style.display =
              card.getAttribute("data-sector") === selectedDepartment ||
              selectedDepartment === "Todos"
                ? "block"
                : "none";
          });

          showPanel(panelCard);
        });
      });
    };

    redirect();
  };

  handlerSidebar();

  const handlerNavBar = () => {
    let initialVisibility = [];

    const initializeVisibility = () => {
      const titlesPOPs = document.querySelectorAll(".pop-card");
      initialVisibility = Array.from(titlesPOPs).map(
        (popCard) => popCard.style.display
      );
    };

    const search = () => {
      const searchInput = document
        .querySelector("#search-pops")
        .value.toLowerCase();
      const titlesPOPs = document.querySelectorAll(".pop-card");
      const visiblePOPs = Array.from(titlesPOPs).filter(
        (popCard) => popCard.style.display !== "none"
      );

      visiblePOPs.forEach((popCard) => {
        const title = popCard.querySelector("h4").textContent.toLowerCase();

        if (searchInput === "") {
          popCard.style.display = "block";
        } else if (title.includes(searchInput)) {
          popCard.style.display = "block";
        } else {
          popCard.style.display = "none";
        }
      });

      if (searchInput === "") {
        const selectedDepartment =
          document.querySelector("#departament").textContent;
        titlesPOPs.forEach((popCard) => {
          if (popCard.getAttribute("data-sector") === selectedDepartment) {
            popCard.style.display = "block";
          } else {
            popCard.style.display = "none";
          }
        });
      }
    };

    initializeVisibility();

    document.querySelector("#search-pops").addEventListener("input", search);

    const vieweNewPOP = () => {
      const btnNewPOP = document.querySelector("#new-btn-pop");
      const departament = document.querySelector("#departament");
      const supe = document.querySelector("#super");

      if (!btnNewPOP || !departament || !supe) return;

      if (
        departament.textContent.trim() !== "Recursos Humanos" ||
        supe.textContent.trim() !== "Sim"
      ) {
        btnNewPOP.style.display = "none";
      }
    };

    vieweNewPOP();
  };

  handlerNavBar();

  const handlerMessageAcordo = () => {
    const checkbox = document.getElementById("agreeCheckbox");
    const confirmButton = document.querySelector("#confirmButton");
    const messagePanel = document.querySelector(".panelAcordo");
    const info = document.querySelector("#userConfirmMessage");

    let messageTimeout;

    checkbox.addEventListener("change", function () {
      confirmButton.disabled = !this.checked;
    });

    const updateMessagePanelVisibility = () => {
      const isConfirmed = info.textContent.trim() === "Confirmado";

      if (isConfirmed) {
        messagePanel.style.display = "none";
        clearTimeout(messageTimeout);
      } else {
        messageTimeout = setTimeout(() => {
          messagePanel.style.display = "flex";
        }, 10000);
      }
    };

    updateMessagePanelVisibility();

    confirmButton.addEventListener("click", () => {
      info.textContent = "Confirmado";
      updateMessagePanelVisibility();
    });
  };

  handlerMessageAcordo();

  /* MODAL NOVO POP */

  const NewPOP = (() => {
    const showModal = () => {
      const modal = document.querySelector(".panelNew");
      modal.style.display = "flex";
    };

    const hideModal = () => {
      const modal = document.querySelector(".panelNew");
      modal.style.display = "none";
    };

    const addAttachment = () => {
      const attachmentList = document.getElementById("attachmentList");
      const descriptionInput = document.getElementById("attachmentDescription");
      const fileInput = document.getElementById("attachmentFile");

      if (descriptionInput.value && fileInput.files.length > 0) {
        const attachmentItem = document.createElement("div");
        attachmentItem.classList.add("attachment-item");

        const attachmentText = document.createElement("span");
        attachmentText.textContent = `${fileInput.files[0].name}`;

        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(fileInput.files[0]);
        downloadLink.target = "_blank";
        downloadLink.textContent = "Baixar";

        attachmentItem.appendChild(attachmentText);
        attachmentItem.appendChild(downloadLink);
        attachmentList.appendChild(attachmentItem);

        descriptionInput.value = "";
        fileInput.value = "";
      } else {
        alert("Por favor, preencha a descrição e selecione um arquivo.");
      }
    };

    const createPOP = (event) => {
      event.preventDefault();

      const descricao = document.getElementById("descricaoNew").value;
      const objetivo = document.getElementById("objetivoNew").value;
      const setor = document.getElementById("setorNewPOP").value;
      const dataRevisao = document.getElementById("dataRevisao").value;
      const attachmentList =
        document.getElementById("attachmentList").childElementCount;

      if (descricao && objetivo && setor && dataRevisao && attachmentList > 0) {
        console.log("POP criada com sucesso:", {
          descricao,
          objetivo,
          setor,
          dataRevisao,
        });
        hideModal();
      } else {
        alert(
          "Por favor, preencha todos os campos obrigatórios e adicione pelo menos um anexo."
        );
      }
    };

    const cancelNewPOP = () => {
      hideModal();
    };

    const init = () => {
      document
        .getElementById("addAttachmentBtn")
        .addEventListener("click", addAttachment);
      document
        .getElementById("createPOPBtn")
        .addEventListener("click", createPOP);
      document
        .getElementById("CancelNewPOP")
        .addEventListener("click", cancelNewPOP);
      document
        .getElementById("new-btn-pop")
        .addEventListener("click", showModal);
    };

    return {
      init,
    };
  })();
  NewPOP.init();

  /* ORDEM PELA NUMERACAO DE CARD */

  const ordemCards = () => {
    const popList = document.querySelector(".pop-list");
    const cards = Array.from(popList.getElementsByClassName("pop-card"));

    cards.sort((a, b) => {
      const numA = parseInt(
        a.querySelector("h4").textContent.match(/SGQ-POP-(\d+)/)[1]
      );
      const numB = parseInt(
        b.querySelector("h4").textContent.match(/SGQ-POP-(\d+)/)[1]
      );
      return numA - numB;
    });

    popList.innerHTML = "";
    cards.forEach((card) => popList.appendChild(card));
  };

  ordemCards();

  /* PAGE CONFIRM */

  const headlerPageConfirm = () => {
    const search = () => {
      const inputSearchName = document
        .querySelector("#search-names")
        .value.toLowerCase()
        .trim();

      document.querySelectorAll(".Dados-confirm").forEach((row) => {
        const name = row
          .querySelector(".dados-name-confirm")
          .textContent.toLowerCase()
          .trim();

        if (name.includes(inputSearchName)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    };
    document.querySelector("#search-names").addEventListener("input", search);

    const selectSearch = () => {
      const selectedStatus = document
        .getElementById("selectStatus")
        .value.toLowerCase();
      document.querySelectorAll(".Dados-confirm").forEach((row) => {
        const status =
          row
            .querySelector(".dados-status-confirm")
            ?.textContent.toLowerCase() || "";
        row.style.display =
          selectedStatus === "all" || status === selectedStatus ? "" : "none";
      });
    };

    document
      .getElementById("selectStatus")
      .addEventListener("change", selectSearch);

    const exportList = () => {
      const table = document.getElementById("listConfirmTable");

      const workbook = XLSX.utils.table_to_book(table, {
        sheet: "Lista de Confirmações",
      });

      XLSX.writeFile(workbook, "Lista_Confirmacoes.xlsx");
    };

    document
      .getElementById("export-btn-listConfirm")
      .addEventListener("click", exportList);

    const formatDate = (dateStr) => {
      const [day, month, year] = dateStr
        .replace(/[\/]/g, "-")
        .split("-")
        .map(Number);
      const fullYear = year < 100 ? year + 2000 : year;
      const monthNames = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];
      const formattedDay = day < 10 ? `0${day}` : day;
      return `${formattedDay} de ${monthNames[month - 1]} ${fullYear}`;
    };

    const formatAllDates = () => {
      document.querySelectorAll(".dados-date-confirm").forEach((element) => {
        element.textContent = formatDate(element.textContent);
      });
    };

    formatAllDates();

    const traco = () => {
      const dadosConfirm = document
        .querySelectorAll(".Dados-confirm")
        .forEach((row) => {
          const status = row.querySelector(".dados-status-confirm");
          const dateConfirm = row.querySelector(".dados-date-confirm");
          if (status.textContent === "Pendente") {
            dateConfirm.textContent = "-";
          }
        });
    };
    traco();
  };

  headlerPageConfirm();

  /* PAGE GERENCIAR */

  const handlerPageGerenciar = () => {
    const searchInput = document.querySelector("#search-gerenciar");
    const statusSelect = document.querySelector("#selectStatusUserManage");

    if (!searchInput || !statusSelect) {
      console.error("Search input or status select not found");
      return;
    }

    const filterRows = () => {
      const searchValue = searchInput.value.toLowerCase().trim();
      const selectedStatus = statusSelect.value.toLowerCase();
      const rows = document.querySelectorAll(".users-list table tbody tr");

      rows.forEach((row) => {
        const name = row
          .querySelector(".users-manage")
          ?.textContent.toLowerCase()
          .trim();
        const status = row
          .querySelector("td:nth-child(6)")
          ?.textContent.toLowerCase()
          .trim();

        const matchesSearch = name.includes(searchValue);
        const matchesStatus =
          selectedStatus === "all" || status === selectedStatus;

        row.style.display = matchesSearch && matchesStatus ? "" : "none";
      });
    };

    searchInput.addEventListener("input", filterRows);
    statusSelect.addEventListener("change", filterRows);

    const exportTableManage = () => {
      document
        .getElementById("export-btn-ListUsers")
        .addEventListener("click", () => {
          const table = document.querySelector(".users-list table");
          const workbook = XLSX.utils.book_new();
          const worksheetData = [];

          const headers = Array.from(table.querySelectorAll("thead th"))
            .slice(1)
            .map((th) => th.textContent);
          worksheetData.push(headers);

          const rows = Array.from(table.querySelectorAll("tbody tr"));
          rows.forEach((row) => {
            const rowData = Array.from(row.querySelectorAll("td"))
              .slice(1)
              .map((td) => td.textContent);
            worksheetData.push(rowData);
          });

          const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
          XLSX.utils.book_append_sheet(workbook, worksheet, "User List");
          XLSX.writeFile(workbook, "User_List.xlsx");
        });
    };

    exportTableManage();

    const menu = () => {
      const showPasswordResetModal = () => {
        document.querySelector(".modal-redefinir").style.display = "flex";
      };

      document
        .querySelector(".modal-redefinir button")
        .addEventListener("click", () => {
          document.querySelector(".modal-redefinir").style.display = "none";
        });

      const show = () => {
        const menuModal = document.querySelector(".PanelUserEdit");
        const btnsChecks = document.querySelectorAll(".editUserCheck");
        const cancelButton = document.querySelector(".cancel-button-edit");
        const saveButton = document.querySelector(".submit-button-edit");
        const redefinirButton = document.querySelector(".btn-redefinir");

        btnsChecks.forEach((btnCheck) => {
          btnCheck.addEventListener("change", () => {
            menuModal.style.display = btnCheck.checked ? "flex" : "none";
          });
        });

        cancelButton.addEventListener("click", () => {
          menuModal.style.display = "none";
          btnsChecks.forEach((btnCheck) => (btnCheck.checked = false));
        });

        redefinirButton.addEventListener("click", (event) => {
          event.preventDefault();
          showPasswordResetModal();
        });
      };

      show();
    };
    menu();

    const formatDate = (dateStr) => {
      const [day, month, year] = dateStr
        .replace(/[\/]/g, "-")
        .split("-")
        .map(Number);
      const fullYear = year < 100 ? year + 2000 : year;
      const monthNames = [
        "Jan",
        "Fev",
        "Mar",
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
      ];
      const formattedDay = day < 10 ? `0${day}` : day;
      return `${formattedDay} de ${monthNames[month - 1]} ${fullYear}`;
    };

    const formatAllDates = () => {
      document.querySelectorAll(".dateManage").forEach((element) => {
        element.textContent = formatDate(element.textContent);
      });
    };

    formatAllDates();
  };

  handlerPageGerenciar();

  /* PAGE CREATE */

  const handlePageCreate = () => {
    const createUserModal = document.querySelector(".PanelCreateUser");
    const successModal = document.querySelector(".modal-createUser");
    const submitButton = document.querySelector(".submit-button-create");
    const cancelButton = document.querySelector(".cancel-button-create");
    const closeModalButton = document.querySelector(".modal-createUser button");

    const isFormValid = () => {
      const requiredFields = createUserModal.querySelectorAll(
        "input[required], select[required]"
      );
      return Array.from(requiredFields).every(
        (field) => field.value.trim() !== ""
      );
    };

    const clearForm = () => {
      createUserModal.querySelectorAll("input, select").forEach((field) => {
        field.value = "";
      });
    };

    submitButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (isFormValid()) {
        successModal.style.display = "flex";
      } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
      }
    });

    closeModalButton.addEventListener("click", () => {
      successModal.style.display = "none";
      clearForm();
    });

    cancelButton.addEventListener("click", () => {
      clearForm();
    });
  };

  handlePageCreate();

  /* MODAL LIXO */

  const modalLixo = () => {
    const modal = document.querySelector(".modal-lixo");
    const btnLixo = document.querySelectorAll(".lixo-btn");
    const btnCancelLixo = document.querySelector(".btn-cancel-lixo");
    const btnLixoConfirm = document.querySelector(".btn-lixo");

    const showModal = () => {
      modal.classList.add("show");
    };

    const hideModal = () => {
      modal.classList.remove("show");
    };

    btnLixo.forEach((button) => {
      button.addEventListener("click", showModal);
    });

    btnLixoConfirm.addEventListener("click", () => {
      console.log("POP deleted");
      hideModal();
    });

    btnCancelLixo.addEventListener("click", hideModal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        hideModal();
      }
    });

    return {
      showModal,
      hideModal,
    };
  };

  modalLixo();

  /* MODAL SOBRE */

  const sobre = () => {
    const modalSobre = document.querySelector(".modal-sobre");
    const btnVersao = document.querySelector("#versao-sistema");
    const btnFechar = document.querySelector("#btnSobre");

    btnVersao.addEventListener("click", () => {
      modalSobre.classList.toggle("show");
    });

    btnFechar.addEventListener("click", () => {
      modalSobre.classList.toggle("show");
    });
  };

  sobre();

  /* COLORS STATUS */
  const colorStatus = () => {
    const colorUserConfirm = () => {
      document.querySelectorAll(".Dados-confirm").forEach((row) => {
        const dadosStatus = row.querySelector(".dados-status-confirm");
        if (dadosStatus.textContent === "Confirmado") {
          dadosStatus.classList.add("confirmado");
        } else {
          dadosStatus.classList.add("pendente");
        }
      });
    };
    colorUserConfirm();

    const colorUserManage = () => {
      document.querySelectorAll(".users-list tbody tr").forEach((row) => {
        const manageStatus = row.querySelector(".user-status-manage");
        if (manageStatus.textContent === "Ativo") {
          manageStatus.classList.add("confirmado");
        } else {
          manageStatus.classList.add("pendente");
        }
      });
    };
    colorUserManage();
  };

  colorStatus();

  /* MODAL EXIT */

  const exit = () => {
    const modal = document.querySelector(".modal-exit");
    const btnExit = document
      .querySelector("#sair")
      .addEventListener("click", () => {
        modal.classList.toggle("show");
      });

    const encerrar = () => {
      const btnEncerrar = document
        .querySelector(".btn-exit")
        .addEventListener("click", () => {
          window.location.href = "/index.html";
        });
    };
    encerrar();

    const cancelEncerrar = () => {
      const btnEncerrar = document
        .querySelector(".btn-cancel")
        .addEventListener("click", () => {
          modal.classList.toggle("show");
        });
    };
    cancelEncerrar();
  };
  exit();

  /* LOADING */

  const loading = () => {
    const viewerLoading = document.querySelector("#loadingScreen");

    window.addEventListener("load", () => {
      setTimeout(() => {
        viewerLoading.style.display = "none";
      }, 150);
    });
  };

  loading();

  const menuMobile = () => {
    const sidebar = document.querySelector(".sidebar");
    const menu = document
      .querySelector(".menuMobile")
      .addEventListener("click", () => {
        sidebar.style.display = "block";
      });

    const fecharMobile = () => {
      const X = document
        .querySelector(".sidebar-header p")
        .addEventListener("click", () => {
          sidebar.style.display = "none";
        });
    };
    fecharMobile();
  };
  menuMobile();
});
