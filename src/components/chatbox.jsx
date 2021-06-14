import React, { useState, useEffect, useContext } from "react";
import { globalStateContext, dispatchStateContext } from "./../context";

export default function ChatBox() {
  const [ctx, setctx] = [
    useContext(globalStateContext),
    useContext(dispatchStateContext),
  ];

  const [currentMessage, setCurrentMessage] = useState("");
  const firebase = ctx.firebase;

  const [opened, setOpened] = useState(false);

  const [chatData, setChatData] = useState(null);

  const [toUpdate, setToUpdate] = useState(false);

  const [messages, setMessages] = useState([]);

  useEffect(
    function () {
      if (chatData != null) console.log(chatData.id);
    },
    [chatData]
  );

  useEffect(() => {
    if (ctx.user !== null)
      firebase
        .firestore()
        .collection("messages")
        .where("fromEmail", "==", ctx.user.email)
        .get()
        .then((response) => {
          console.log(ctx.user);
          if (!response.empty) {
            setChatData(response.docs[0]);
            setMessages(response.docs[0].data().data);
            createSnapshot(ctx.user.email);
          } else {
            console.log("create");
            firebase
              .firestore()
              .collection("messages")
              .doc()
              .set({
                data: [],
                fromEmail: ctx.user.email,
              })
              .then((res) => {
                createSnapshot(ctx.user.email);
              });
          }
        });
  }, []);
  const renderMessage = () => {};

  const sendMessage = () => {
    console.log(chatData.id);
    if (currentMessage === null || currentMessage === "" || chatData === null)
      return;
    else {
      firebase
        .firestore()
        .collection("messages")
        .doc(chatData.id)
        .set(
          {
            data: [
              ...messages,
              { outstream: true, content: currentMessage, time: new Date() },
            ],
          },
          { merge: true }
        )
        .then((response) => {
          document.getElementById("message").value = "";
        });
      setCurrentMessage("");
    }
  };
  const createSnapshot = (email) => {
    firebase
      .firestore()
      .collection("messages")
      .where("fromEmail", "==", email)
      .onSnapshot((response) => {
        setChatData(response.docs[0]);
        setMessages(response.docs[0].data().data);
      });
  };
  const signin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    firebase.auth().languageCode = "it";

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        setctx({ ...ctx, user: user });

        localStorage.setItem("user", JSON.stringify(user));

        firebase
          .firestore()
          .collection("messages")
          .where("fromEmail", "==", user.email)
          .get()
          .then((response) => {
            console.log(user);
            if (!response.empty) {
              setChatData(response.docs[0]);
              setMessages(response.docs[0].data().data);
              createSnapshot(user.email);
            } else {
              console.log("create");
              firebase
                .firestore()
                .collection("messages")
                .doc()
                .set({
                  data: [],
                  fromEmail: user.email,
                })
                .then((res) => {
                  createSnapshot(user.email);
                });
            }
          });
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  return (
    <div class={`chatbox ${opened && "active"}`}>
      <div
        className="chat-indicator"
        onClick={() => {
          setOpened(!opened);
        }}
      >
        <div className={`fa ${opened ? "fa-times" : "fa-weixin"}`}></div>
      </div>
      <div className="chat-body">
        <div className="chat-header">
          {ctx.user === null ? (
            "Signed Out"
          ) : (
            <div className="d-flex justify-content-around align-items-center">
              {ctx.user.displayName}
              <button
                className="btn btn-light"
                onClick={() => {
                  setctx({ ...ctx, user: null });
                  localStorage.removeItem("user");
                  firebase.auth().signOut();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
        <div className="p-2">
          <div className="chat-scroll custom-scroll">
            {ctx.user !== null ? (
              messages.map((message, i) => (
                <div
                  className={`d-flex  ${
                    !message.outstream
                      ? "justify-content-start"
                      : "justify-content-end"
                  } `}
                >
                  <div className="">
                    <div
                      key={`messages_${message.fromEmail}_${i}`}
                      className={`chat-messages  message ${
                        message.outstream ? "from-customer" : "from-admin"
                      } `}
                    >
                      <div></div>
                      <div className="message-content">{message.content}</div>
                      <div className="message-time">
                        <small>
                          {new Date(message.time.seconds).getHours()}:
                          {new Date(message.time.seconds).getMinutes()}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-0 pt-3">
                In order to identify you, you need to sign in with google
                <div className="mb-3"></div>
                <button
                  class="btn btn-primary w-100"
                  onClick={() => {
                    signin();
                  }}
                >
                  Sign in with Google
                </button>
              </div>
            )}
          </div>
          <div className="chat-form">
            <div className="d-flex justify-content-between">
              <input
                type="text"
                id="message"
                className="text-fields py-1 mb-0"
                onChange={(e) => {
                  setCurrentMessage(e.target.value);
                }}
              />
              <div className="px-1"></div>
              <button
                class="btn bg-green-dark"
                onClick={() => {
                  sendMessage();
                }}
              >
                <i class="fa fa-paper-plane text-light" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
