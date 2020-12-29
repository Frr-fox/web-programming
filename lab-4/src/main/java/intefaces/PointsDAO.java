package intefaces;

import entities.Point;

import javax.ejb.Local;
import java.util.List;

@Local
public interface PointsDAO {
    boolean addPoint(Point point);
    boolean deletePoints(int userId);
    List<Point> getAllPoints(int userId);
}
