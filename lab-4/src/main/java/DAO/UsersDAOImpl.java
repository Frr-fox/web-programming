package DAO;

import Utils.Hashing;
import Utils.HibernateSessionFactory;
import controllers.UserBean;
import entities.User;
import intefaces.UsersDAO;
import org.hibernate.Session;
import org.hibernate.Transaction;

import javax.ejb.Stateful;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Stateful
public class UsersDAOImpl implements UsersDAO {
    static Logger logger = Logger.getLogger(UserBean.class.getName());

    public boolean addUser(User user) {
        logger.log(Level.INFO, "Добавление пользователя");
        Session session = HibernateSessionFactory.getSessionFactory().openSession();
        Transaction tx1 = session.beginTransaction();
        session.save(user);
        tx1.commit();
        session.close();
        return true;
    }

    public boolean checkLogin(String login) {
        logger.log(Level.INFO, "Проверка логина");
        List<User> userList = HibernateSessionFactory.getSessionFactory().openSession()
                .createQuery("From User where login = :login")
                .setParameter("login", login).list();
        return (userList.size() == 0);
    }

    public boolean checkUser(String login, String password) {
        logger.log(Level.INFO, "Проверка пользователя");
        List<User> userList = HibernateSessionFactory.getSessionFactory().openSession()
                .createQuery("From User where login = :login")
                .setParameter("login", login).list();
        if (userList.size() != 1) return false;
        User user = userList.get(0);
        if (user.getPass().equals(Hashing.getHash(password, user.getSalt()))) {
            logger.log(Level.INFO, "Логин и пароль подходят");
            return true;
        } else return false;
    }

    public Integer getUserIdByLogin(String login) {
        logger.log(Level.INFO, "Получение id пользователя");
        List<User> userList = HibernateSessionFactory.getSessionFactory().openSession()
                .createQuery("From User where login = :login")
                .setParameter("login", login).list();
        logger.log(Level.INFO, "Size: " + userList.size());
        if (userList.size() != 1) return null;
        User user = userList.get(0);
        return user.getId();
    }
}
