import { useStoreActions } from 'easy-peasy'

const useClearStore = (userState) => {
  const patientStore = useStoreActions((actions) => actions.patient)
  const omnichannelStore = useStoreActions((actions) => actions.omnichannel)
  const generateInvoiceStore = useStoreActions(
    (actions) => actions.generateInvoice
  )
  const myAccountStore = useStoreActions((actions) => actions.myAccount)
  const adminUsersStore = useStoreActions((actions) => actions.adminUsers)
  const adminPurchasesStore = useStoreActions(
    (actions) => actions.adminPurchases
  )
  const adminCatalogStore = useStoreActions((actions) => actions.adminCatalog)
  const adminInstructionsStore = useStoreActions(
    (actions) => actions.adminInstructions
  )
  const adminConfigStore = useStoreActions((actions) => actions.adminConfig)
  const changeUserEmailStore = useStoreActions(
    (actions) => actions.changeUserEmail
  )
  const removeUserState = useStoreActions(
    (actions) => actions.account.removeUser
  )
  const checkoutStore = useStoreActions((actions) => actions.checkout)

  const clearStore = () => {
    removeUserState(userState)
    patientStore.setInitialState()
    omnichannelStore.setInitialState()
    generateInvoiceStore.setInitialState()
    myAccountStore.setInitialState()
    adminUsersStore.setInitialState()
    adminPurchasesStore.setInitialState()
    adminCatalogStore.setInitialState()
    adminInstructionsStore.setInitialState()
    adminConfigStore.setInitialState()
    changeUserEmailStore.setInitialState()
    checkoutStore.addPatientInfo({})
    checkoutStore.addUserInfo({})
    checkoutStore.addUserAccount({})
    checkoutStore.addBillingInfo({})
    checkoutStore.addContactInfo({})
    checkoutStore.setEditing(null)
    checkoutStore.addSecretExists('')
  }

  return { clearStore }
}

export default useClearStore
