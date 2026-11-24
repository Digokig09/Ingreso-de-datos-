// config.js
const SUPABASE_URL = 'https://tcfltbzyuliqwsjyfayu.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Wzlad96_bkK7e1ahMx-2UA_iAOdrqFg';
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const FORMAS_PAGO_GENERALES = [
    "EFECTIVO", "TRANSFERENCIA", "DEPOSITO", "VALES", "STRIPE",
    "OPENPAY", "SIN P. REGISTRADOS", "TERMINAL BBVA", "TERMINAL BANREGIO"
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
