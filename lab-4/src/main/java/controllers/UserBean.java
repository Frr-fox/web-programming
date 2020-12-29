package controllers;

import Utils.EncodeBase64;
import entities.User;
import intefaces.UsersDAO;
import lombok.NoArgsConstructor;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.UnsupportedEncodingException;
import java.util.logging.Level;
import java.util.logging.Logger;

@Singleton
@Path("/user")
@NoArgsConstructor
@LocalBean
public class UserBean {
    static Logger logger = Logger.getLogger(UserBean.class.getName());

    @EJB
    private UsersDAO manager;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/register")
    public Response addUser(@Context HttpHeaders headers) throws UnsupportedEncodingException {
        int access = 403;
        String authorization = headers.getRequestHeader("Authorization").get(0);
        String[] decodeLogin = EncodeBase64.decodeString(authorization);
        User user = new User(decodeLogin[0], decodeLogin[1]);
        logger.log(Level.INFO, decodeLogin[0] + " " + decodeLogin[1]);
        if (manager.checkLogin(user.getLogin()) && manager.addUser(user)) {
            access = 201;
        }
        return Response.status(access).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/login")
    public Response checkUser(@Context HttpHeaders headers) throws UnsupportedEncodingException {
        int access = 401;
        String authorization = headers.getRequestHeader("Authorization").get(0);
        String[] decodeLogin = EncodeBase64.decodeString(authorization);
        logger.log(Level.INFO, decodeLogin[0] + " " + decodeLogin[1]);
        if (manager.checkUser(decodeLogin[0], decodeLogin[1])) {
            access = 200;
        }
        return Response.status(access).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/logout")
    public Response logout() {
        return Response.ok().build();
    }
}
