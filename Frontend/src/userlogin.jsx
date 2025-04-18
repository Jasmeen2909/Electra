import "./App.css";
import * as React from "react";
import Button from "@mui/material/Button";
import Footer from "./footer";
import Logo from "./logo";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useEffect } from "react";
import bcrypt from 'bcryptjs-react';
var hashedOTP1 = '';
function User_login() {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    handleDialogClose();
  };

  let navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  var userId = '';






  function handleSubmit(e) {
    e.preventDefault();

    axios
      .get(`http://localhost:2111/api/product/${email}`)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        const cred = response.data[0].Password;
        if (cred !== password) {
          alert("incorrect credentials");
        } else if (email === "" || password === "") {
          alert("please enter details");
        } else {

          axios
            .post(`http://localhost:2111/api/product/otpverify/${email}`)
            .then((response) => {
              // Handle successful response
              console.log("Email sent successfully");

              hashedOTP1 = response.data.data.hashedOTP
              
              handleDialogOpen();
              // return hashedOTP1;
            })
            .catch((error) => {
              // Handle error
              console.error("Failed to send email:", error);
            });

        }
      })
      .catch((error) => console.error(error));


  }


  const changePath = () => {

    try{
      bcrypt.hash(otp, 10, function(err, hash) {
        if (err) {
            console.error('Error hashing OTP:', err);
            return;
        }
    
        bcrypt.compare(otp, hashedOTP1, function(err, result) {
            if (err) {
                console.error('Error comparing OTP hashes:', err);
                return;
            }
    
            
    
            if (result) {
                let path = '/dashboard';
                navigate(path);
            } else {
                alert("Incorrect OTP. Please enter correct otp");
            }
        });
    });
    


    }
    catch (error) {
      // Handle error
      console.error("Verification failed:", error.response.data);
    };
  };


  return (
    <div className="Login">
      <Logo />
      <div>
        <h1 className="font">LOGIN</h1>
        <div className="account">
          <h4 className="font">Don’t have an account?</h4>

          <Link to={"/signup"} className="link">
            <h4 className="font">Sign up</h4>
          </Link>
        </div>

        <form>
          <input
            type="text"
            id="clgname"
            name="clgname"
            placeholder="Enter College Email"
            className="signup_input"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br></br>
          <input
            placeholder="Enter Password"
            type="password"
            id="pass"
            name="password"
            className="signup_input"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br></br>
          {/* <Link to={'/dashboard'} className='link'> */}
          <Button>
            <button
              className="pointer button1"
              onClick={(e) => handleSubmit(e)}
            >
              Login
            </button>
          </Button>
          {/* </Link> */}
        </form>
        <Dialog
          open={openDialog}
          onClose={handleDialogClose}
          PaperProps={{
            style: {
              backgroundColor: "#e5ded9", // Background color for the entire dialog
            },
          }}
        >
          <DialogTitle
            style={{
              textAlign: "center",
              color: "#4e3b32",
              fontWeight: "bold",
            }}
          >
            Verification
          </DialogTitle>
          <DialogContent>
            <DialogContentText style={{ color: "#4e3b32" }}>
              We have sent you a One Time Password on your college email.
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="otp"
              name="otp"
              label="Enter OTP"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e) => setOtp(e.target.value)}
            />
          </DialogContent>
          <DialogActions style={{ justifyContent: "center" }}>
            <Button
              onClick={() => changePath()}
              style={{
                color: "#4e3b32",
                fontWeight: "bolder",
                fontSize: "20px",
              }}
              type="submit"
            >
              Next
            </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Footer />
    </div>
  );
}

export default User_login;
