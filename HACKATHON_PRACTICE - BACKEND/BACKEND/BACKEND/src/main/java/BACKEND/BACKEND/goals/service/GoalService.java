package BACKEND.BACKEND.goals.service;

import BACKEND.BACKEND.goals.model.Contribution;
import BACKEND.BACKEND.goals.model.GoalGroup;
import BACKEND.BACKEND.goals.repository.ContributionRepository;
import BACKEND.BACKEND.goals.repository.GoalGroupRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GoalService {

    private final GoalGroupRepository goalGroupRepository;
    private final ContributionRepository contributionRepository;

    public GoalGroup createGoal(String name, Double targetAmount) {
        GoalGroup goal = GoalGroup.builder()
                .name(name)
                .targetAmount(targetAmount)
                .currentAmount(0.0)
                .build();
        return goalGroupRepository.save(goal);
    }

    @Transactional
    public Contribution contribute(String userId, Long goalId, Double amount) {
        GoalGroup goal = goalGroupRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        // Create contribution
        Contribution contribution = Contribution.builder()
                .userId(userId)
                .goalId(goalId)
                .amount(amount)
                .build();

        // Update goal progress
        goal.setCurrentAmount(goal.getCurrentAmount() + amount);
        goalGroupRepository.save(goal);

        return contributionRepository.save(contribution);
    }

    public Map<String, Object> getProgress(Long goalId) {
        GoalGroup goal = goalGroupRepository.findById(goalId)
                .orElseThrow(() -> new RuntimeException("Goal not found"));

        Double progress = (goal.getCurrentAmount() / goal.getTargetAmount()) * 100;

        Map<String, Object> result = new HashMap<>();
        result.put("goalId", goalId);
        result.put("name", goal.getName());
        result.put("targetAmount", goal.getTargetAmount());
        result.put("currentAmount", goal.getCurrentAmount());
        result.put("progressPercentage", Math.min(100.0, progress));

        return result;
    }
}
