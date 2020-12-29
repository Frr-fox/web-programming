package DAO;

import Utils.HibernateSessionFactory;
import entities.Point;
import intefaces.PointsDAO;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import javax.ejb.Stateful;
import java.util.ArrayList;

@Stateful
public class PointsDAOImpl implements PointsDAO {

    public boolean addPoint(Point point) {
        System.out.println(point);
        Session session = HibernateSessionFactory.getSessionFactory().openSession();
        Transaction tx1 = session.beginTransaction();
        session.save(point);
        tx1.commit();
        session.close();
        System.out.println("Точка добавлена");
        return true;
    }

    public boolean deletePoints(int userId) {
        Session session = HibernateSessionFactory.getSessionFactory().openSession();
        Transaction tx1 = session.beginTransaction();
        Query query = session.createQuery("Delete from Point where user_id = :user_id")
                .setParameter("user_id", userId);
        int count = query.executeUpdate();
        tx1.commit();
        session.close();
        if (count> 0) {
            System.out.println("Данные удалены");
            System.out.println(count);
            return true;
        } else return false;
    }

    public ArrayList<Point> getAllPoints(int userId) {
        ArrayList<Point> points = (ArrayList<Point>) HibernateSessionFactory.getSessionFactory().openSession()
                .createQuery("From Point where user_id = :user_id")
                .setParameter("user_id", userId).list();
        return points;
    }
}
