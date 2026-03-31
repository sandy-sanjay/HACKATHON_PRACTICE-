package BACKEND.BACKEND.goals.controller;

import BACKEND.BACKEND.goals.model.Contribution;
import BACKEND.BACKEND.goals.model.GoalGroup;
import BACKEND.BACKEND.goals.service.GoalService;
import BACKEND.BACKEND.auth.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
public class GoalController {

    private final GoalService goalService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<GoalGroup>> createGoal(
            @RequestParam String name,
            @RequestParam Double targetAmount) {
        try {
            GoalGroup goal = goalService.createGoal(name, targetAmount);
            return ResponseEntity.ok(ApiResponse.success(goal, "Goal created successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/contribute")
    public ResponseEntity<ApiResponse<Contribution>> contribute(
            @RequestHeader("X-User-Id") String userId,
            @RequestParam Long goalId,
            @RequestParam Double amount) {
        try {
            Contribution contribution = goalService.contribute(userId, goalId, amount);
            return ResponseEntity.ok(ApiResponse.success(contribution, "Contribution successful"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }

    @GetMapping("/{id}/progress")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getProgress(@PathVariable Long id) {
        try {
            Map<String, Object> progress = goalService.getProgress(id);
            return ResponseEntity.ok(ApiResponse.success(progress, "Progress retrieved successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
}
