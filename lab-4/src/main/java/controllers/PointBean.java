package controllers;

import Utils.EncodeBase64;
import intefaces.PointsDAO;
import intefaces.UsersDAO;
import lombok.NoArgsConstructor;
import entities.Point;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateful;
import javax.faces.bean.SessionScoped;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

@Stateful
@SessionScoped
@Path("point")
@NoArgsConstructor
@LocalBean
public class PointBean {
    static Logger logger = Logger.getLogger(PointBean.class.getName());

    @EJB
    private PointsDAO manager;
    @EJB
    private UsersDAO userManager;

    @POST
    @Path("/check")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response check(Point point, @Context HttpHeaders headers) throws UnsupportedEncodingException {
        Point p = new Point(point.getX(), point.getY(), point.getR());
        p.setTime(DateTimeFormatter.ofPattern("HH:mm:ss").format(LocalDateTime.now()));
        p.setInArea(checkFunction(p));
        String authorization = headers.getRequestHeader("Authorization").get(0);
        String[] decodeLogin = EncodeBase64.decodeString(authorization);
        p.setUser_id(userManager.getUserIdByLogin(decodeLogin[0]));
        manager.addPoint(p);
        return Response.ok().entity(p).build();
    }

    private boolean checkFunction(Point p) {
        double x = p.getX();
        double y = p.getY();
        double r = p.getR();
        return (x <= 0 && y >= 0 && (x*x + y*y <= r*r)) || (x >= 0 && y >= 0 && (y <= -2*x + r)) ||
                (x <= 0 && y <= 0 && y >= - r && x >= -r);
    }

    @GET
    @Path("/table")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPointsList(@Context HttpHeaders headers) throws UnsupportedEncodingException {
        String authorization = headers.getRequestHeader("Authorization").get(0);
        String[] decodeLogin = EncodeBase64.decodeString(authorization);
        int userId = userManager.getUserIdByLogin(decodeLogin[0]);
        return Response.ok().entity(manager.getAllPoints(userId)).build();
    }

    @POST
    @Path("/delete")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteData(@Context HttpHeaders headers) throws UnsupportedEncodingException {
        int access = 401;
        String authorization = headers.getRequestHeader("Authorization").get(0);
        String[] decodeLogin = EncodeBase64.decodeString(authorization);
        int userId = userManager.getUserIdByLogin(decodeLogin[0]);
        if (manager.deletePoints(userId)) access = 200;
        return Response.status(access).build();
    }
}
