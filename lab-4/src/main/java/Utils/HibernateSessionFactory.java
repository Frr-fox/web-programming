package Utils;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import entities.Point;
import entities.User;
import org.hibernate.SessionFactory;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;

import javax.faces.bean.SessionScoped;

@SessionScoped
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class HibernateSessionFactory {
    private static SessionFactory sessionFactory;

    public static SessionFactory getSessionFactory() {
        if (sessionFactory == null) {
            try {
                Configuration configuration = new Configuration().configure();
                configuration.addAnnotatedClass(User.class);
                configuration.addAnnotatedClass(Point.class);
                StandardServiceRegistryBuilder builder = new StandardServiceRegistryBuilder().applySettings(configuration.getProperties());
                sessionFactory = configuration.buildSessionFactory(builder.build());
            } catch (Exception e) {
               e.printStackTrace();
            }
        }
        return sessionFactory;
    }
}
