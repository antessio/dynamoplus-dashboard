/**
=========================================================
* Soft UI Dashboard React - v3.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SuiBox from "components/SuiBox";
import SuiTypography from "components/SuiTypography";
import SuiInput from "components/SuiInput";
import SuiButton from "components/SuiButton";

// Authentication layout components
import Card from "@mui/material/Card";

// Images

import BasicLayout from "../components/BasicLayout";
import authProvider from "custom/authorization/authProvider";


function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [formFieldValues, setFormFieldValues] = useState(true);

  const handleChange = (name,value) => {
    // console.log(event);
    // setFormFieldValues(event.target.value);
    setFormFieldValues({...formFieldValues, [name]: value});
  };

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleSubmit = (e) => {
    e.preventDefault();
    

    console.log("handle login")
    console.log(formFieldValues);
    authProvider.login(formFieldValues.email, formFieldValues.password);
    // this.props.form.validateFields((err, values) => {
    //     if (!err) {
    //         console.log(values.username)
    //         console.log(values.password)
    //         authProvider.login(values.username, values.password)
    //             .then(t => console.log(t))
    //     }
    // });
}
  return (
    <BasicLayout>
      <Card>
      <SuiBox pt={2} pb={3} px={3}>
      
        <SuiBox component="form" role="form" onSubmit={handleSubmit}>
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography component="label" variant="caption" fontWeight="bold">
                Email
              </SuiTypography>
            </SuiBox>
            <SuiInput type="text" placeholder="Email" onChange={(e)=>handleChange("email",e.target.value)}/>
          </SuiBox>
          <SuiBox mb={2}>
            <SuiBox mb={1} ml={0.5}>
              <SuiTypography component="label" variant="caption" fontWeight="bold">
                Password
              </SuiTypography>
            </SuiBox>
            <SuiInput type="password" placeholder="Password" onChange={(e)=>handleChange("password",e.target.value)} />
          </SuiBox>
          <SuiBox display="flex" alignItems="center">
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <SuiTypography
              variant="button"
              fontWeight="regular"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;Remember me
            </SuiTypography>
          </SuiBox>
          <SuiBox mt={4} mb={1}>
            <SuiButton type="submit" variant="gradient" color="info" fullWidth>
              login
            </SuiButton>
          </SuiBox>
    
        </SuiBox>
    
      </SuiBox>
      </Card>
      
    </BasicLayout>
  );
}

export default SignIn;
