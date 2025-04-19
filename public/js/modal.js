document.addEventListener("DOMContentLoaded", () => {
  console.log("modal.js cargado y DOM listo ✅");

  document.querySelectorAll('[data-modal-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal-id');
      showModal(modalId);
    });
  });

  window.showModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    } else {
      console.warn(`No se encontró el modal con id: ${modalId}`);
    }
  };

  window.hideModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
    } else {
      console.warn(`No se encontró el modal con id: ${modalId}`);
    }
  };
});
