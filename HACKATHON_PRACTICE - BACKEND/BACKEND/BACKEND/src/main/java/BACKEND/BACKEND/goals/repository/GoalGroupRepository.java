package BACKEND.BACKEND.goals.repository;

import BACKEND.BACKEND.goals.model.GoalGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GoalGroupRepository extends JpaRepository<GoalGroup, Long> {
}
