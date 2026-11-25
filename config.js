// config.js
const SUPABASE_URL = 'https://tcfltbzyuliqwsjyfayu.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Wzlad96_bkK7e1ahMx-2UA_iAOdrqFg';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ÚNICOS correos con permiso para entrar a administador.html
const ADMIN_EMAILS = [
    'alemezaza9@gmail.com',
    'diego15albert@gmail.com'
];

const EMAILJS_CONFIG = {
    enabled: true,
    publicKey: '7BSKiAQOV0FrxPBfn',
    serviceId: 'service_l29yb7z',
    templateId: 'template_11c56w9',
    destinatarioDefault: 'diego15albert@gmail.com'
};

const FORMAS_PAGO_GENERALES = [
    "EFECTIVO",
    "TRANSFERENCIA",
    "DEPOSITO",
    "VALES",
    "VALES (NUEVA MODALIDAD - POR CONFIRMAR)",
    "ZELLE",
    "SQUARE",
    "STRIPE",
    "OPENPAY",
    "SIN P. REGISTRADOS",
    "TERMINAL BBVA",
    "TERMINAL BANREGIO"
];

const CATALOGOS = {
    almacenes: {
        Nacional: [
            { nombre: "100- CORPORATIVO", pais: "México", limiteCancelaciones: 0, formasPago: null },
            { nombre: "101- IRAPUATO", pais: "México", limiteCancelaciones: 30, formasPago: null },
            { nombre: "103- IZTAPALAPA", pais: "México", limiteCancelaciones: 30, formasPago: null },
            { nombre: "105- VISTA NORTE", pais: "México", limiteCancelaciones: 30, formasPago: null },
            { nombre: "106- NEZAHUALCOYOTL", pais: "México", limiteCancelaciones: 30, formasPago: null },
            { nombre: "107- PUEBLA", pais: "México", limiteCancelaciones: 30, formasPago: null },
            { nombre: "108- OAXACA", pais: "México", limiteCancelaciones: 30, formasPago: null },
            { nombre: "109- SAN MARTIN", pais: "México", limiteCancelaciones: 30, formasPago: null },
            { nombre: "110- TEHUACÁN", pais: "México", limiteCancelaciones: 30, formasPago: null },
            { nombre: "111- CUERNAVACA", pais: "México", limiteCancelaciones: 30, formasPago: null },
            { nombre: "112- COATZACOALCOS", pais: "México", limiteCancelaciones: 30, formasPago: null },
            { nombre: "113- MONTERREY", pais: "México", limiteCancelaciones: 30, formasPago: null },
            { nombre: "114- VERACRUZ", pais: "México", limiteCancelaciones: 30, formasPago: null }
        ],
        Extranjero: [
            { nombre: "700 Central usa", pais: "Estados Unidos", limiteCancelaciones: 25, formasPago: ["TRANSFERENCIA", "STRIPE", "OPENPAY", "SIN P. REGISTRADOS"] },
            { nombre: "701 callcenter usa", pais: "Estados Unidos", limiteCancelaciones: 25, formasPago: ["TRANSFERENCIA", "STRIPE", "OPENPAY", "SIN P. REGISTRADOS"] },
            { nombre: "702 lbc(Ismerely bussines center)", pais: "Estados Unidos", limiteCancelaciones: 25, formasPago: ["EFECTIVO", "TRANSFERENCIA", "STRIPE", "TERMINAL BBVA", "SIN P. REGISTRADOS"] }
        ]
    },
    formasPagoDefault: FORMAS_PAGO_GENERALES,
    motivosCancelacion: [
        "ERROR DE ALMACEN", "ERROR DE PRODUCTO MOSTRADOR", "ERROR DE PRODUCTO EMBAJADOR",
        "ERROR DE ID MOSTRADOR", "FONDOS INSUFICIENTES", "VALE ERRONEO", "DOBLE IMPACTO",
        "BOTÓ REGALOS", "PRODUTO DEFECTUOSO", "BONO CADUCADO", "ERROR DE PERIODO",
        "FALTA DE PRODUCTO", "PAGO DE VALE NO REFLEJADO", "ERROR DE SISTEMA",
        "NOTAS DE PRUEBA", "PRODUCTO NO AUTORIZADO", "VALE SIN SALDO", "VALE VENCIDO", "NO EXISTE BONO"
    ],
    responsables: [
        "EVELYN PÉREZ", "ALEJANDRINA MEZA", "CRISTINA URBINA"
    ]
};

(function cargarOverridesLocales() {
    try {
        const saved = JSON.parse(localStorage.getItem('cenis_almacenes_config') || '{}');
        ['Nacional', 'Extranjero'].forEach(tipo => {
            (CATALOGOS.almacenes[tipo] || []).forEach(alm => {
                if (saved[alm.nombre]) {
                    if (typeof saved[alm.nombre].limiteCancelaciones === 'number') {
                        alm.limiteCancelaciones = saved[alm.nombre].limiteCancelaciones;
                    }
                    if (Array.isArray(saved[alm.nombre].formasPago) && saved[alm.nombre].formasPago.length > 0) {
                        alm.formasPago = saved[alm.nombre].formasPago;
                    }
                }
            });
        });
    } catch (e) { /* ignorar */ }
})();

// Convierte automáticamente cualquier <select> en un menú desplegable estilizado Ismerely
function estilizarSelectsIsmerely() {
    document.querySelectorAll('select').forEach(selectEl => {
        if (selectEl.dataset.ismerelyEnhanced === '1') {
            selectEl._syncUI && selectEl._syncUI();
            return;
        }
        selectEl.dataset.ismerelyEnhanced = '1';
        selectEl.classList.add('hidden');

        const wrapper = document.createElement('div');
        wrapper.className = 'ismerely-select-wrapper';
        selectEl.parentNode.insertBefore(wrapper, selectEl);
        wrapper.appendChild(selectEl);

        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'ismerely-select-trigger';

        const labelSpan = document.createElement('span');
        labelSpan.className = 'truncate';
        const arrowSpan = document.createElement('span');
        arrowSpan.className = 'ismerely-select-arrow';
        arrowSpan.textContent = '▾';

        trigger.appendChild(labelSpan);
        trigger.appendChild(arrowSpan);

        const menu = document.createElement('div');
        menu.className = 'ismerely-select-menu hidden';

        wrapper.appendChild(trigger);
        wrapper.appendChild(menu);

        const syncUI = () => {
            trigger.disabled = selectEl.disabled;
            trigger.classList.toggle('is-disabled', selectEl.disabled);
            const selectedOpt = selectEl.options[selectEl.selectedIndex];
            labelSpan.textContent = selectedOpt ? selectedOpt.textContent : 'Selecciona...';

            menu.innerHTML = '';
            Array.from(selectEl.options).forEach((opt, idx) => {
                const item = document.createElement('button');
                item.type = 'button';
                item.className = 'ismerely-select-option' + (idx === selectEl.selectedIndex ? ' is-selected' : '');
                item.textContent = opt.textContent;
                item.disabled = opt.disabled;
                item.addEventListener('click', () => {
                    selectEl.selectedIndex = idx;
                    selectEl.dispatchEvent(new Event('change', { bubbles: true }));
                    menu.classList.add('hidden');
                    trigger.classList.remove('is-open');
                    syncUI();
                });
                menu.appendChild(item);
            });
        };

        selectEl._syncUI = syncUI;

        const observer = new MutationObserver(syncUI);
        observer.observe(selectEl, { childList: true, attributes: true, attributeFilter: ['disabled'] });

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            if (selectEl.disabled) return;
            const willOpen = menu.classList.contains('hidden');
            document.querySelectorAll('.ismerely-select-menu').forEach(m => m.classList.add('hidden'));
            document.querySelectorAll('.ismerely-select-trigger').forEach(t => t.classList.remove('is-open'));
            if (willOpen) {
                syncUI();
                menu.classList.remove('hidden');
                trigger.classList.add('is-open');
            }
        });

        syncUI();
    });
}

document.addEventListener('click', () => {
    document.querySelectorAll('.ismerely-select-menu').forEach(m => m.classList.add('hidden'));
    document.querySelectorAll('.ismerely-select-trigger').forEach(t => t.classList.remove('is-open'));
});

document.addEventListener('DOMContentLoaded', estilizarSelectsIsmerely);
