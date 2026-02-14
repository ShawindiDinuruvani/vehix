import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Backend එකේ හැම path එකකටම
                .allowedOrigins("http://localhost:3000") // මෙතන "*" දාන්න එපා! කෙලින්ම Frontend URL එක දාන්න.
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true); // මේක true නිසා තමයි උඩ එකට URL එකම දෙන්න ඕන වුනේ.
    }
}