package BACKEND.BACKEND.goals.controller;

import BACKEND.BACKEND.goals.dto.ApiResponse;
import BACKEND.BACKEND.goals.model.Contribution;
import BACKEND.BACKEND.goals.model.GoalGroup;
import BACKEND.BACKEND.goals.service.GoalService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GoalController {

    private final GoalService goalService;

    @PostMapping("/create")
    public ApiResponse<GoalGroup> createGoal(@RequestBody GoalCreateRequest request) {
        try {
            GoalGroup goal = goalService.createGoal(request.getName(), request.getTargetAmount());
            return ApiResponse.success(goal, "Goal created successfully");
        } catch (Exception e) {
            return ApiResponse.error("Failed to create goal: " + e.getMessage());
        }
    }

    @PostMapping("/contribute")
    public ApiResponse<Contribution> contribute(@RequestBody ContributionRequest request) {
        try {
            Contribution contribution = goalService.contribute(request.getUserId(), request.getGoalId(), request.getAmount());
            return ApiResponse.success(contribution, "Contribution successful");
        } catch (Exception e) {
            return ApiResponse.error("Contribution failed: " + e.getMessage());
        }
    }

    @GetMapping("/progress")
    public ApiResponse<Map<String, Object>> getProgress(@RequestParam Long goalId) {
        try {
            Map<String, Object> progress = goalService.getProgress(goalId);
            return ApiResponse.success(progress, "Progress fetched successfully");
        } catch (Exception e) {
            return ApiResponse.error("Failed to fetch progress: " + e.getMessage());
        }
    }
}

@Data
class GoalCreateRequest {
    private String name;
    private Double targetAmount;
}

@Data
class ContributionRequest {
    private String userId;
    private Long goalId;
    private Double amount;
}
