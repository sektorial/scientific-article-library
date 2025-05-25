package ua.com.ivolnov.sci_article_library;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "ua.com.ivolnov.sci_article_library")
public class ArticleLibraryApplication {

    public static void main(String[] args) {
        SpringApplication.run(ArticleLibraryApplication.class, args);
    }

}
