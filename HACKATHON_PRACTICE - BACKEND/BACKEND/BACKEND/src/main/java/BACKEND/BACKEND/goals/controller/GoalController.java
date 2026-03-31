package BACKEND.BACKEND.goals.controller;

import BACKEND.BACKEND.goals.dto.ApiResponse;
import BACKEND.BACKEND.goals.model.Contribution;
import BACKEND.BACKEND.goals.model.GoalGroup;
import BACKEND.BACKEND.goals.service.GoalService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GoalController {

    private final GoalService goalService;

    private String getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.toString();
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<GoalGroup>> createGoal(@RequestBody GoalCreateRequest request) {
        try {
            GoalGroup goal = goalService.createGoal(request.getName(), request.getTargetAmount());
            return ResponseEntity.ok(ApiResponse.success(goal, "Goal created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to create goal: " + e.getMessage()));
        }
    }

    @GetMapping("")
    public ResponseEntity<ApiResponse<List<GoalGroup>>> getAllGoals() {
        try {
            List<GoalGroup> goals = goalService.getAllGoals();
            return ResponseEntity.ok(ApiResponse.success(goals, "Goals fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch goals: " + e.getMessage()));
        }
    }

    @PostMapping("/contribute")
    public ResponseEntity<ApiResponse<Contribution>> contribute(@RequestBody ContributionRequest request) {
        try {
            String userId = getCurrentUserId();
            Contribution contribution = goalService.contribute(userId, request.getGoalId(), request.getAmount());
            return ResponseEntity.ok(ApiResponse.success(contribution, "Contribution successful"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Contribution failed: " + e.getMessage()));
        }
    }

    @GetMapping("/progress")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getProgress(@RequestParam Long goalId) {
        try {
            Map<String, Object> progress = goalService.getProgress(goalId);
            return ResponseEntity.ok(ApiResponse.success(progress, "Progress fetched successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error("Failed to fetch progress: " + e.getMessage()));
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
