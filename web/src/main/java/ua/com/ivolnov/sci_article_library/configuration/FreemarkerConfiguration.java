package ua.com.ivolnov.sci_article_library.configuration;

import freemarker.template.TemplateModelException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

@Configuration
@RequiredArgsConstructor
public class FreemarkerConfiguration {

    private final FreeMarkerConfigurer freeMarkerConfigurer;

    @PostConstruct
    public void configuration() throws TemplateModelException {
        freeMarkerConfigurer.getConfiguration().setSharedVariable("app", "Sci Library");
    }

}
