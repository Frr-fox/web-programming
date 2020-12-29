package Utils;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;

public class Hashing {

    public static String getHash(String password, byte[] salt) {
        try {
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-512");
            messageDigest.update(password.getBytes());
            byte[] bytes = messageDigest.digest(salt);
            BigInteger bigIntegers = new BigInteger(1, bytes);
            StringBuilder hashText = new StringBuilder(bigIntegers.toString(16));
            while(hashText.length() < 64) hashText.insert(0, "0");
            return hashText.toString();
        } catch (NoSuchAlgorithmException e) {
            System.out.println("Подобный алгоритм хеширования не найден");
            return null;
        }
    }

    public static byte[] getSalt(){
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[64];
        random.nextBytes(salt);
        return salt;
    }
}
