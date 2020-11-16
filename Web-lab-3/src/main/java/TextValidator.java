import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator ("textValidator")
public class TextValidator implements Validator {

    @Override
    public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException {
        try {
            if (value.toString().length()==0 || value.toString().trim().equals("")) {
                FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error!", "Введите значение в поле Y");
                throw new ValidatorException(msg);
            }
            double y = Double.parseDouble(value.toString().trim().replace(",", "."));
            if (y > 3 || y < -3) {
                FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error!", "Значение Y должно быть [-3;3]");
                throw new ValidatorException(msg);
            }
        }
        catch(IllegalArgumentException e) {
            FacesMessage msg = new FacesMessage(FacesMessage.SEVERITY_ERROR, "Error!", "Неверный формат данных");
            throw new ValidatorException(msg);
        }
    }
}


