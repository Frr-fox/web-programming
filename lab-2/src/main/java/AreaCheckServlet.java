import org.classesFor.Point;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashSet;

public class AreaCheckServlet extends HttpServlet {
    ArrayList<Point> pointList = null;
    ServletConfig config;

    @Override
    public void init(ServletConfig config) throws ServletException {
        this.config = config;
    }

    @Override
    public ServletConfig getServletConfig() {
        return config;
    }

    @Override
    public void destroy() {}

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        req.getRequestDispatcher("header.jsp").include(req, resp);
        long startTime = new Date().getTime();
        PrintWriter printWriter = resp.getWriter();

        if (pointList == null) {
            pointList = new ArrayList<>();
            config.getServletContext().setAttribute("pointList", pointList);
        }
        Point currentPoint;
        try {
            currentPoint = new Point(Integer.parseInt(req.getParameter("X")), Double.parseDouble(req.getParameter("Y")),
                    Double.parseDouble(req.getParameter("R")));
        } catch (NumberFormatException e) {
            currentPoint = null;
        }
        if (validate(currentPoint)) {
            if (check(currentPoint))
                currentPoint.setResult(true);
            else currentPoint.setResult(false);
            pointList.add(currentPoint);
        } else currentPoint = null;
        req.setAttribute("currentPoint", currentPoint);
        long endTime = new Date().getTime();
        if (currentPoint != null) currentPoint.setDuration(endTime-startTime);
        req.getRequestDispatcher("areaCheck.jsp").include(req, resp);
        req.getRequestDispatcher("footer.jsp").include(req, resp);
    }

    private boolean validate(Point point) {
        if (point == null) return false;
        int x = point.getX();
        double y = point.getY();
        double r = point.getR();
        HashSet<Integer> x_values = new HashSet<>(Arrays.asList(-5, -4, -3, -2, -1, 0, 1, 2, 3));
        HashSet<Double> r_values = new HashSet<>(Arrays.asList(1d, 1.5d, 2d, 2.5d, 3d));
        return (y<=3 && y>=-5 && x_values.contains(x) && r_values.contains(r));
    }

    private boolean check(Point point) {
        LocalDateTime time = LocalDateTime.now();
        point.setTime(DateTimeFormatter.ofPattern("HH:mm:ss").format(time));
        int x = point.getX();
        double y = point.getY();
        double r = point.getR();
        return ((y>=0 && x<=0 && y<=r && x >=-r/2) || (y>=0 && x>=0 && (y*y + x*x <= r*r)) || (x<=0 && y<=0 && (y>=-x-r)));
    }
}
