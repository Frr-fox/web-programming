package Utils;

import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class EncodeBase64 {

    public static String[] decodeString(String encodeText) throws UnsupportedEncodingException {
        String encodedLoginPass = encodeText.substring(6);
        String decodedLoginPass = new String(java.util.Base64.getDecoder().decode(encodedLoginPass), StandardCharsets.UTF_8);
        return decodedLoginPass.split(":");
    }

}
