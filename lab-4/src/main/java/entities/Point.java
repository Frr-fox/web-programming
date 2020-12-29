package entities;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "pointstable")
@Data
@NoArgsConstructor
public class Point implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private int id;

    @Basic
    @Column(nullable = false)
    private int user_id;

    @Basic
    @Column(nullable = false)
    private double x;

    @Basic
    @Column(nullable = false)
    private double y;

    @Basic
    @Column(nullable = false)
    private double r;

    @Basic
    @Column(nullable = false)
    private boolean inArea;

    @Basic
    @Column(nullable = false)
    private String time;

    public Point(double xValue, double yValue, double rValue) {
        this.x = xValue;
        this.y = yValue;
        this.r = rValue;
    }
}
