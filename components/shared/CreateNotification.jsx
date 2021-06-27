import graphQLFetch from "../../graphQLFetch";

const CreateNotification = async (giver, receiver, action, photo) => {
  const query = `mutation createNotification($input:createNotificationInput!) {
        createNotification(input:$input) {
          notification {
            id
          }
        }
      }`;

  let input = { data: {} };
  input.data.giver = giver;
  input.data.receiver = receiver;
  input.data.action = action;
  if (photo) input.data.photo = photo;

  const result = await graphQLFetch(query, { input }, true);
};

export default CreateNotification;
