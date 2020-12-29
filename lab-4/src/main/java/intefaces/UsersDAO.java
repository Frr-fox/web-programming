package intefaces;

import entities.User;

import javax.ejb.Local;

@Local
public interface UsersDAO {
    boolean addUser(User user);
    boolean checkUser(String login, String password);
    boolean checkLogin(String login);
    Integer getUserIdByLogin(String login);
}
