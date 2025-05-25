package ua.com.ivolnov.sci_article_library.article;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.With;

import static jakarta.persistence.GenerationType.AUTO;

@Entity(name = "article")
@Table(name = "article")
@With
@Builder
@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
class ScientificArticle {

    @Id
    @GeneratedValue(strategy = AUTO)
    @Column(name = "id")
    @EqualsAndHashCode.Include
    private UUID id;
    @Size(min = 1, max = 255)
    @Column(name = "title", nullable = false)
    private String title;
    @Size(min = 1, max = 255)
    @Column(name = "authors", nullable = false)
    private String authors;
    @Size(min = 1, max = 255)
    @Column(name = "journal", nullable = false)
    private String journal;
    @Size(min = 4, max = 4)
    @Column(name = "year", nullable = false)
    private String year;

}
