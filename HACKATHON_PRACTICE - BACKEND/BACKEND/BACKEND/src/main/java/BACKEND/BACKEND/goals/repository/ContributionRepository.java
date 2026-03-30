package BACKEND.BACKEND.goals.repository;

import BACKEND.BACKEND.goals.model.Contribution;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ContributionRepository extends JpaRepository<Contribution, Long> {
    List<Contribution> findByGoalId(Long goalId);
}
