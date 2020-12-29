package entities;

import Utils.Hashing;
import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "userstable")
@NoArgsConstructor
@Data
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    @Setter(AccessLevel.NONE)
    private int id;

    @Basic
    @Column(nullable = false)
    private String login;

    @Basic
    @Column(nullable = false)
    private String pass;

    @Basic
    @Column(nullable = false)
    private byte[] salt;


    public User(String login, String pass) {
        this.login = login;
        this.salt = Hashing.getSalt();
        this.pass = Hashing.getHash(pass, this.salt);
    }
}
