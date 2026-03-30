package BACKEND.BACKEND.goals.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "contributions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contribution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private Long goalId;

    @Column(nullable = false)
    private Double amount;
}
