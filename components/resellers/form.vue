<template>
  <div>
    <h1>Become a Reseller</h1>
    <b-form @submit.prevent="save">
      <b-row>
        <b-col md="12" lg="6">
          <b-form-group
            id="input-group-1"
            label="First Name:"
            label-for="input-1"
            label-align="left"
          >
            <b-form-input id="input-1" v-model="form.first_name" required placeholder="John"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="12" lg="6">
          <b-form-group
            id="input-group-2"
            label="Last Name:"
            label-for="input-2"
            label-align="left"
          >
            <b-form-input id="input-2" v-model="form.last_name" required placeholder="Doe"></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" lg="6">
          <b-form-group id="input-group-3" label="Company:" label-for="input-3" label-align="left">
            <b-form-input
              id="input-3"
              v-model="form.company_name"
              required
              placeholder="Example LLC"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="12" lg="6">
          <b-form-group id="input-group-4" label="Email:" label-for="input-4" label-align="left">
            <b-form-input
              id="input-4"
              v-model="form.email"
              type="email"
              required
              placeholder="john.doe@example.com"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group
            id="input-group-products"
            class="text-left"
            label="Products"
            label-align="left"
          >
            <b-form-checkbox
              v-for="product in products"
              :key="product.id"
              :value="product"
              v-model="form.selected_products"
              button
              button-variant="secondary"
              class="mr-2 mt-1"
            >{{product.name}}</b-form-checkbox>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12" lg="6">
          <b-form-group
            id="input-group-5"
            label="Authorized Reseller Name:"
            label-for="input-5"
            label-align="left"
          >
            <b-form-input
              id="input-5"
              v-model="form.authorized_reseller_name"
              required
              placeholder="Name submited to AWS"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col md="12" lg="6">
          <b-form-group
            id="input-group-6"
            label="Authorized Reseller AWS Account ID:"
            label-for="input-6"
            label-align="left"
          >
            <b-form-input
              id="input-6"
              v-model="form.authorized_reseller_aws_account_id"
              required
              placeholder="AWS Account ID"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-button block type="submit" variant="primary">
        <b-spinner small v-if="loading"></b-spinner>
        {{ button_label }}
      </b-button>
    </b-form>
    <b-alert fade show v-if="show_error" class="mt-4" variant="danger">{{ error }}</b-alert>
  </div>
</template>

<script>
import moment from "moment";
import { post_reseller_submission } from "~/components/helpers/storage";
import { AVAILABLE_PRODUCTS } from "~/components/helpers/reseller";

export default {
  data() {
    return {
      loading: false,
      error: "",
      products: AVAILABLE_PRODUCTS,
      show_error: false,
      teste_selected_products: [],
      form: {
        first_name: "",
        last_name: "",
        company_name: "",
        email: "",
        authorized_reseller_name: "",
        authorized_reseller_aws_account_id: "",
        selected_products: []
      }
    };
  },

  methods: {
    //
    //  1. Method to save the form
    //  called once the user click on the 'Register' Button
    //
    save() {
      //
      // 1. Reset error state.
      //
      this.error = "";
      this.show_error = false;

      //
      //  2. Assert that we have at least 1 selected products.
      //
      if (this.form.selected_products.length === 0) {
        this.error = "Select at least 1 product.";
        this.show_error = true;
        return;
      }

      //
      //  3. Assert that the account id informed is 12 digits.
      //
      let account_id_pattern = /^\d{12}$/;
      let valid_account_id = account_id_pattern.test(
        this.form.authorized_reseller_aws_account_id
      );
      if (!valid_account_id) {
        this.error = "Invalid AWS account ID";
        this.show_error = true;
        return;
      }

      //
      //  4.  Make the S3 object name using Unix miliseconds, to ensure that
      //      the name is unique, and will make the triggering system perform
      //      a put event.
      //
      let key = Date.now() + ".json";

      //
      //  5. Set the loading state.
      //
      this.loading = true;

      //
      //  6.  Submit the form with the s3 key and:
      //      - a callback function so we can redirect the user on success
      //      - a callback function to notify the user on error.
      //
      post_reseller_submission(this.form, key, this.on_succes, this.on_error);
    },

    //
    //  2.  Callback function called when the submission is done.
    //
    on_succes() {
      //
      //  1.  Reset the loading state.
      this.loading = false;

      //
      //
      //  2.  Send the user to a 'thank you' page
      //
      this.$router.push({ path: "/resellers/thanks" });
    },

    //
    //  3.  Callback function called when theres an error in the form submission.
    //
    on_error(error) {
      //
      //  1.  Reset the loading state.
      //
      this.loading = false;

      //
      //  2.  Display the error message
      //
      this.error =
        "A problem ocorred when submiting your form, please try again.";
      this.show_error = true;
      //
      //  3.  Log the error object
      //
      console.log(error);
    }
  },
  computed: {
    button_label() {
      return this.loading ? "Submitting..." : "Submit";
    }
  }
};
</script>
