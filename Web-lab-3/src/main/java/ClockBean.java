import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ManagedBean(name = "clock")
@ViewScoped
public class ClockBean {
    String time;
    String day;

    public ClockBean() {
        updateTime();
    }

    public void updateTime() {
        LocalDateTime time = LocalDateTime.now();
        this.time = DateTimeFormatter.ofPattern("HH:mm:ss").format(time);
        this.day = DateTimeFormatter.ofPattern("dd.MM.YY").format(time);
    }

    public String getTime() {
        return time + " " + day;
    }

}
