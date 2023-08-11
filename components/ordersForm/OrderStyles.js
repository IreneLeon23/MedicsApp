const styles = {
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 40,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    headerTitle: {
      fontFamily: "jakarta-medium",
      fontSize: 18,
      color: "#145498",
      marginLeft: 15,
    },
    // Estilos para el formulario multi-step
    formStep: {
      flex: 1,
    },
    statusBar: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20,
    },
    statusBarStep: {
      width: 100,
      height: 7,
      borderRadius: 8,
      backgroundColor: "#ccc",
      marginHorizontal: 5,
    },
    statusBarStepActive: {
      backgroundColor: "#145498",
    },
    formRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 5,
    },
    leftInput: {
      flex: 1,
      marginRight: 1,
    },
    rightInput: {
      flex: 1,
      marginLeft: 10,
    },
    inputSpacer: {
      width: 1,
    },
    inputInline: {
      flex: 1,
      marginHorizontal: 2,
    },
    navigationContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
    },
    navigationButton: {
      backgroundColor: "#145498",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 4,
      marginBottom: 10,
    },
    navigationButtonText: {
      color: "#fff",
      fontFamily: "jakarta-semi-bold",
      fontSize: 16,
      textAlign: "center",
    },
    // Estilos para los campos del formulario
    fieldContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      justifyContent: "space-between",
    },
    // Estilo para el contenedor de los inputs de fecha
    dateInputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
  };
  export {styles};