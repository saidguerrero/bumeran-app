export const LIMIT_TAX_DATA_SAVED = 3

export const INDICATION_TYPE_BE = {
  FAST: 'ayuno',
  ABSTINENCE: 'abstinencia'
}

export const NO_MINOR_FAST_CODE = 'AYU01'

export const ORDER_BY = {
  ASC: 'ASC',
  DESC: 'DESC'
}

export const DEPENDANT_STATUS = {
  NEW: 'nuevo',
  IN_PROGRESS: 'en_progreso'
}

export const LOG_LEGAL_COLUMNS = {
  CODE: 'code',
  ACTION: 'action',
  CATEGORY: 'category',
  DATE: 'date',
  TIME: 'time'
}

export const ORDER_STATUSES_RESULTS_BE = {
  PENDING: 'pendiente',
  PROCESSING: 'en_proceso',
  NORECORD: 'sin_registro',
  PARTIAL: 'preliminar',
  RESULT: 'final',
  CANCEL: 'cancelado'
}

export const ORDER_STATUSES_BILLING_BE = {
  ASK_BILLING: 'solicitar_factura',
  PROCESSING: 'en_proceso',
  BILLING: 'generada',
  UNSOLICITED: 'no_solicitada',
  ERROR: 'error',
  ERROR_CP: 'error_cp',
  ERROR_RFC: 'error_rfc',
  ERROR_CFDI: 'error_cfdi',
  ERROR_RAZON: 'error_razon',
  ERROR_REGIMEN: 'error_regimen',
  CANCELED: 'cancelada'
}

export const ORDER_STATUSES_RESULTS = {
  pendiente: 'pending',
  en_proceso: 'processing',
  preliminar: 'partial',
  final: 'result',
  cancelado: 'cancel'
}

export const STATUS_PAGE = {
  no_conectado: 'no_conectado',
  conectado: 'conectado'
}

export const ORDER_STATUSES_BILLING = {
  solicitar_factura: 'askBilling',
  generada: 'billing',
  no_solicitada: 'unsolicited',
  sin_registro: 'unsolicited',
  error: 'error',
  error_cp: 'askBilling',
  error_rfc: 'askBilling',
  error_cfdi: 'askBilling',
  error_razon: 'askBilling',
  error_regimen: 'askBilling',
  cancelada: 'canceled',
  en_proceso: 'processing'
}

export const ORDER_STATUSES_RESULTS_HAS_TOOLTIP = {
  cancelado: true,
  pendiente: true,
  en_proceso: true,
  preliminar: false,
  final: false
}

export const ORDER_STATUSES_BILLING_HAS_TOOLTIP = {
  no_solicitada: true,
  en_proceso: true,
  error: true,
  error_cfdi: true,
  error_cp: true,
  error_razon: true,
  error_regimen: true,
  solicitar_factura: false,
  generada: false,
  cancelada: false
}

export const ORDER_STATUSES_PAYMENT = {
  requires_payment_method: 'paymentRejected',
  requires_confirmation: 'partialResult',
  requires_action: 'partialResult',
  processing: 'partialResult',
  requires_capture: 'partialResult',
  canceled: 'transferFailed',
  succeeded: 'success',
  pending_information_retrieval: 'partialResult',
  refunded: 'refunded',
  refund_failed: 'refundFailed'
}

export const ORDER_STATUSES_PAYMENT_BE = {
  PAYMENT_REJECTED: 'requires_payment_method',
  REQUIRES_CONFIRMATION: 'requires_confirmation',
  REQUIRES_ACTION: 'requires_action',
  PROCESSING: 'processing',
  REQUIRES_CAPTURE: 'requires_capture',
  CANCELED: 'canceled',
  SUCCESS: 'succeeded',
  PENDING_INFORMATION: 'pending_information_retrieval',
  REFUNDED: 'refunded',
  REFUND_FAILED: 'refund_failed'
}

export const TEST_STATUSES = {
  PUBLISHED: 'published',
  NOT_PUBLISHED: 'notPublished',
  DETAIL_PUBLISHED: 'detailPublished',
  DETAIL_NOT_PUBLISHED: 'detailNotPublished'
}

export const TEST_STATUSES_ARR = ['notPublished', 'published']

export const TEST_STATUS = {
  true: 'detailPublished',
  false: 'detailNotPublished'
}

export const COLORS = {
  certusNeutro: {
    60: '#494748',
    40: '#838282'
  },
  certusBrand: {
    violet: '#7474C1',
    purple10: '#F1F1F9'
  }
}

export const CART_COLORS = [
  '#F3D03E',
  '#CBA3D8',
  '#88DBDF',
  '#71C5E8',
  '#7474C1',
  '#B580D1'
]

export const LANGUAGES = {
  SPANISH: 'es-MX',
  ENGLISH: 'en-US'
}

export const ROUTES = {
  LOGIN: {
    ID: 'login',
    PATH: '/auth/login'
  },
  HOME: {
    ID: 'home',
    PATH: '/auth/login'
  },
  LOCATIONS: {
    ID: 'locations',
    PATH: '/sucursales'
  },
  LOGOUT: {
    ID: 'logout',
    PATH: '/api/auth/logout'
  },
  RESULTS_NO_LOGIN: {
    ID: 'omnichannel',
    PATH: '/resultados'
  },
  RESULTS_MEDICS: {
    ID: 'medicsLogin',
    PATH: '/medicos/login'
  },
  RESULTS_COMPANY: {
    ID: 'companyLogin',
    PATH: '/empresas/login'
  },
  RESULTS_LAB: {
    ID: 'labLogin',
    PATH: '/laboratorios/login'
  },
  BILLING_NO_LOGIN: {
    ID: 'omnichannel',
    PATH: '/facturacion'
  },
  OMNICHANNEL: {
    ID: 'omnichannel',
    PATH: '/omnichannel'
  },
  RESULTS: {
    ID: 'results',
    PATH: '/omnichannel/results'
  },
  CIRCLE_FAMILY: {
    ID: 'circleFamily',
    PATH: '/patient/family'
  },
  FAVORITES: {
    ID: 'favorites',
    PATH: '/patient/favorites'
  },
  MY_ACCOUNT: {
    ID: 'myAccount',
    PATH: '/patient/account'
  },
  GENERATE_INVOICE: {
    ID: 'generateInvoice',
    PATH: '/omnichannel/generate-invoice'
  },
  PATIENT_FAMILY: {
    ID: 'family',
    PATH: '/patient/family'
  },
  PATIENT_ACCOUNT: {
    ID: 'familyAccount',
    PATH: '/patient/account'
  },
  PATIENT_ADDFAMILY: {
    ID: 'addFamily',
    PATH: '/patient/add-family'
  },
  PATIENT_ADDCHILD: {
    ID: 'addChild',
    PATH: '/patient/register-child'
  },
  PATIENT_SENDINVITATION: {
    ID: 'addChild',
    PATH: '/patient/send-invitation'
  },
  NOT_FOUND: {
    ID: 'notFound',
    PATH: '/404'
  },
  TESTS: {
    ID: 'tests',
    PATH: '/buscar-producto'
  },
  ADMIN: {
    USERS: {
      ID: 'users',
      PATH: '/admin/users',
      PERMISSION: 'canReadPatients'
    },
    UNLINK: {
      ID: 'unlink',
      PATH: '/admin/users/unlink-dependant'
    },
    HISTORIC_ORDER: {
      ID: 'historicOrder',
      PATH: '/admin/users/send-historic-order'
    },
    CATALOG: {
      ID: 'catalog',
      PATH: '/admin/catalog',
      PERMISSION: 'canReadCatalog'
    },
    CATALOG_TESTS: {
      ID: 'catalogTests',
      PATH: '/admin/catalog/tests'
    },
    CATALOG_SAMPLE_TYPES: {
      ID: 'catalogSampleTypes',
      PATH: '/admin/catalog/sample-types'
    },
    CATALOG_INDICATIONS: {
      ID: 'catalogIndications',
      PATH: '/admin/catalog/indications'
    },
    CATALOG_TAGS: {
      ID: 'catalogTags',
      PATH: '/admin/catalog/tags'
    },
    PURCHASES: {
      ID: 'purchases',
      PATH: '/admin/purchases/search-purchase',
      PERMISSION: 'canReadShopping'
    },
    CONFIG: {
      ID: 'config',
      PATH: '/admin/config',
      PERMISSION: 'ROLE_CERTUSADMIN'
    },
    CONFIG_USER: {
      ID: 'configUser',
      PATH: '/admin/config/user'
    },
    CONFIG_USERS: {
      ID: 'configUsers',
      PATH: '/admin/config/users'
    },
    CONFIG_USER_CREATE: {
      ID: 'configUserCreate',
      PATH: '/admin/config/user/create'
    },
    CONFIG_ROLES: {
      ID: 'configRoles',
      PATH: '/admin/config/roles'
    },
    CONFIG_CREATE_ROLE: {
      ID: 'createRole',
      PATH: '/admin/config/create-role'
    }
  }
}

export const ROUTES_IDS = Object.values(ROUTES).map((item) => item.ID)

export const ALERT_TYPE_MESSAGE = {
  REGULAR: 'regular',
  ERROR: 'error',
  SUCCESS: 'success'
}

export const API_RESPONSE = {
  SUCCESS: 'success',
  FAIL: 'fail',
  ERROR: 'error'
}

export const ERROR_CODES = {
  RFC_USED: 'ER024',
  INDICATION_TYPE_DUPLICATED: 'ER038'
}

export const CONTACT_INFO = {
  WHATSAPP:
    'https://api.whatsapp.com/send?phone=526648078700&text=¡Hola Certus! ¿Podrías ayudarme?',
  TEL: 'tel:+526643911144',
  EMAIL: 'mailto:areadeatencionaclientes@certuslab.com.mx'
}

//TODO: We need to define the type of user to display or not some components
export const TYPE_USERS = {
  ADMIN: 'admin',
  PATIENT: 'patient'
}

export const EMAIL_MESSAGE_DISPLAY_VIEW = {
  SENT: 'sentMail',
  MAIL_SUCCESS: 'successMail',
  VERIFICATION_SUCCESS: 'successVerification'
}

export const MODAL_TYPE = {
  SAMPLE: 'SAMPLE',
  TAG: 'TAG',
  ROLE: 'ROLE',
  INDICATION: 'INDICATION',
  INDICATION_TYPE: 'INDICATION_TYPE',
  EDIT: 'EDIT'
}

export const CIRCLE_FAMILY_TYPES = {
  DEPENDANT: 'dependant',
  LINK: 'link',
  CIRCLE: 'circle'
}

export const RECOMMENDED = {
  WOMEN: 'Mujeres 18+',
  MEN: 'Hombres 18+',
  CHILDREN: 'Niños'
}

export const INDICATION_TYPE = {
  WOMEN: 'Mujeres',
  MEN: 'Hombres',
  CHILDREN: 'Niños',
  ADULT: 'Adultos',
  GENERAL: 'General'
}

export const ALL_ROWS = 10000000

export const SASS = {
  LOGIN: 'https://icertus.com.mx/cio/login_certus.php',
  BASE: 'https://icertus.com.mx/cio/'
}
