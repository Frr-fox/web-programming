import javax.ws.rs.*;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/")
public class RestApplication extends Application {

    private Set<Object> singletons = new HashSet<>();
    private HashSet<Class<?>> classes = new HashSet<>();

    @Override
    public Set<Object> getSingletons() {
        return singletons;
    }

    @Override
    public HashSet<Class<?>> getClasses(){
        return classes;
    }
}