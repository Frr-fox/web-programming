import javax.faces.application.FacesMessage;
import javax.faces.bean.ApplicationScoped;
import javax.faces.bean.ManagedBean;
import java.io.Serializable;
import java.sql.*;
import java.util.ArrayList;
import javax.inject.Inject;

@ManagedBean(name = "databaseManager")
@ApplicationScoped
public class DatabaseManagerBean implements Serializable {
    //ssh -Y -L5432:pg:5432 s284715@se.ifmo.ru -p2222
    private static final String URL = "jdbc:postgresql://127.0.0.1:5432/studs";
    private static final String LOGIN = "s284715";
    private static final String PASS = "";
    private ArrayList<PointBean> pointsList;

    @Inject
    private PointBean currentPoint;

    public DatabaseManagerBean() {
        pointsList = new ArrayList<>();
        try {
            Class.forName("org.postgresql.Driver");
            load();
        } catch (ClassCastException | ClassNotFoundException e) {
            System.exit(-1);
        }
    }

    public void load() {
        try (Connection connection = DriverManager.getConnection(URL, LOGIN, PASS)) {
            if (connection == null) throw new SQLException();
            Statement statement = connection.createStatement();
            ResultSet entrySet = statement.executeQuery("SELECT * FROM PointsTable");
            while (entrySet.next()) {
                PointBean pointBean = new PointBean();
                pointBean.setXValue(entrySet.getDouble("x"));
                pointBean.setYValue(entrySet.getDouble("y"));
                pointBean.setRValue(entrySet.getDouble("r"));
                pointBean.setInArea(entrySet.getBoolean("inArea"));
                pointBean.setTime(entrySet.getString("time"));
                pointsList.add(pointBean);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void createPoint(double x, double y, double r) {
        currentPoint = new PointBean(x, y, r);
        addPoint(currentPoint);
    }

    public boolean addPoint(PointBean point) {
        point.check();
        pointsList.add(point);
        try (Connection connection = DriverManager.getConnection(URL, LOGIN, PASS)) {
            PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO PointsTable" +
                    "(x, y, r, inArea, time)" +
                    "VALUES (?, ?, ?, ?, ?);");
            preparedStatement.setDouble(1, point.getXValue());
            preparedStatement.setDouble(2, point.getYValue());
            preparedStatement.setDouble(3, point.getRValue());
            preparedStatement.setBoolean(4, point.isInArea());
            preparedStatement.setString(5, point.getTime());
            preparedStatement.execute();
            System.out.println("Точка добавлена");
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return true;
    }

    public String deleteData() {
        pointsList.clear();
        try (Connection connection = DriverManager.getConnection(URL, LOGIN, PASS)) {
            Statement statement = connection.createStatement();
            statement.executeUpdate("DELETE FROM PointsTable");
            System.out.println("Данные удалены");
            return "true";
        } catch (SQLException e) {
            e.printStackTrace();
            return "false";
        }
    }

    public void createTable() {
        try {
            Connection connection = DriverManager.getConnection(URL, LOGIN, PASS);
            String request = "CREATE TABLE PointsTable\n" +
                    "(\n" +
                    "  x double PRECISION NOT NULL,\n" +
                    "  y double PRECISION NOT NULL,\n" +
                    "  r double PRECISION NOT NULL,\n" +
                    "  inArea boolean NOT NULL,\n " +
                    "  time varchar(10) NOT NULL\n"+
                    ");";
            Statement statement = connection.createStatement();
            statement.executeUpdate(request);
            System.out.println("The table was created");
            connection.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public ArrayList<PointBean> getPointsList() {
        return pointsList;
    }
}