import javax.faces.bean.ManagedBean;
import javax.faces.bean.ViewScoped;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@ManagedBean(name = "clock")
@ViewScoped
public class ClockBean implements Serializable {
    private String time;
    private String day;

    public ClockBean() {
        updateTime();
    }

    public boolean updateTime() {
        LocalDateTime time = LocalDateTime.now();
        this.time = DateTimeFormatter.ofPattern("HH:mm:ss").format(time);
        this.day = DateTimeFormatter.ofPattern("dd.MM.YY").format(time);
        return true;
    }

    public String getTime() {
        return time + " " + day;
    }

}
