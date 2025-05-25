package ua.com.ivolnov.sci_article_library.article;

import lombok.Builder;
import lombok.With;

@With
@Builder
record ScientificArticleDto(String uuid, String title, String authors, String journal, String year) {
}
