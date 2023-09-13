import axios from "axios";

export default class User {
  constructor(user) {
    this.user = user;
  }

  async getUserByAuthentication(session) {
    return axios
      .post(
        `${apiURL}/micertus/users/login`,
        {
          mail: this.user.username,
          password: this.user.password,
        },
        {
          headers: {
            Authorization: `Bearer ${session.token.jwt}`,
          },
        }
      )
      .then(function ({ data }) {
        if (data.status === "success") {
          return {
            email: data.result.correo,
            id: data.result.usuarioId,
            name: data.result.name,
            lastName: data.result.lastName,
            middleName: data.result.secondName,
            surName: data.result.motherFamilyName,
            stripeCustomer: data.result.stripeCustomer,
            gender: data.result.gender,
            birthdate: data.result.birthDate,
            patientId: data.result.patientId,
            phone: data.result.phone,
            seniorAge: data.result.seniorAge,
          };
        }
        return { errorCode: data.error };
      })
      .catch(function () {
        return { errorCode: "LOGIN003" };
      });
  }
}
