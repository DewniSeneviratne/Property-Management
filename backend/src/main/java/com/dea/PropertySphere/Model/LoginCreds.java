package com.dea.PropertySphere.Model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_creds")
public class LoginCreds {

    @Id
    int userid;
    String email;
    String password;

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "LoginCreds{" +
                "userid=" + userid +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
