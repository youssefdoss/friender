import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

/** FrienderApi: Class with methods to make requests to api */

class FrienderApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    let headers = {
      Authorization: `Bearer ${FrienderApi.token}`,
      "Content-Type": `application/json`,
    };

    if (endpoint === "login" || endpoint === "signup") {
      headers = {
        "Content-Type": `application/json`,
      };
    }
    if (endpoint === "upload") {
      headers["Content-Type"] = "multipart/form-data";
    }

    const params = method === "get" ? data : {};
    try {
      const result = await axios({ url, method, data, params, headers });
      return result.data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.errors;

      if (typeof message === "object" && !Array.isArray(message)) {
        let updatedMessage = [];
        for (let key in message) {
          updatedMessage.push(`${key}: ${message[key]}`);
        }
        throw updatedMessage;
      }

      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** login: logs in user
   *
   * data: object - user data {username, password}
   *
   * returns: string - token
   */

  static async login(data) {
    let res = await this.request("login", data, "post");
    return res.token;
  }

  /** Signup user
   * TODO: Deal with camel vs snake casing
   * data: object - user data {email, password, firstName, lastName, location}
   *
   * returns: string - token
   */

  static async signup(data) {
    let res = await this.request("signup", data, "post");
    return res.token;
  }

  /** Edit user
   *
   * data: object - user data {email, password, firstName, lastName, location, bio, radius}
   *
   * returns: string - token
   */

  static async editProfile(data, id) {
    let res = await this.request(`users/${id}`, data, "patch");
    return res.user;
  }

  /** Get current user
   *
   * id: number
   *
   * returns: object - user object
   */

  static async getUser(id) {
    let res = await this.request(`users/${id}`);
    return res.user;
  }

  /** Gets next available user for swiping */
  static async getAvailableUser(id) {
    let res = await this.request(`users/${id}/available-user`);
    return res;
  }

  /** Like a user
   *
   * id: number
   *
   * returns: object - user object
   */

  static async likeUser(id) {
    let res = await this.request(`users/like/${id}`, {}, "post");
    return res;
  }

  /** Disike a user
   *
   * id: number
   *
   * returns: object - user object
   */

  static async dislikeUser(id) {
    let res = await this.request(`users/dislike/${id}`, {}, "post");
    return res;
  }

  /** Get all matches
   *
   * id: number
   *
   * returns: Array of user objects
   */

  static async getMatches(id) {
    let res = await this.request(`users/${id}/matches`);
    return res.matches
  }

  /** Upload image
   *
   * data: FormData (data on image file)
   *
   * returns: object - user object
   */

  static async uploadImage(data) {
    let res = await this.request(`upload`, data, "post");
    return res;
  }
}

export default FrienderApi;
