import request from "request";

const SUBMIT_STRING = "submit=Submit";
const RESPONSE_STRING = "/formResponse?";
const GOOGLE_URL = "https://docs.google.com/forms";
const FORM_URL = "d/e/1FAIpQLScDOXGtIeN0ZBZLBtSVfP88gV-JMYQvmpGrKDn4pyWacmShaQ";

const formQuestions = {
  email: "entry.931296249",
  check: "entry.539848071"
};

export const handleServerResponse = (error, response, body) => {
  if (error) {
    console.log(error);
  }
  if (response) {
    console.log(response);
  }
  if (body) {
    console.log(body);
  }
};

export const submitForm = formResponses => {
  // Encode each of the responses
  const encodedStrings = [];
  Object.keys(formResponses).forEach(item => {
    const value = formResponses[item];
    const encodedString =
      formQuestions[item] + "=" + +encodeURIComponent(value) + "&";

    // Append the values string
    encodedStrings.push(encodedString);
  });

  // Create the final string
  const submissionString = GOOGLE_URL.concat(
    FORM_URL,
    RESPONSE_STRING,
    ...encodedStrings,
    SUBMIT_STRING
  );
  console.log(submissionString);
  request.post({ url: submissionString }, handleServerResponse);
};
