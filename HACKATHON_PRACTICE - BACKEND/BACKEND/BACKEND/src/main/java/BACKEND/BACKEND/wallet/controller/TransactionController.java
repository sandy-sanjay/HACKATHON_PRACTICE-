package BACKEND.BACKEND.wallet.controller;

import BACKEND.BACKEND.wallet.dto.ApiResponse;
import BACKEND.BACKEND.wallet.dto.TransactionRequest;
import BACKEND.BACKEND.wallet.model.Transaction;
import BACKEND.BACKEND.wallet.model.Wallet;
import BACKEND.BACKEND.wallet.service.WalletService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
public class TransactionController {

    private final WalletService walletService;

    private String getCurrentUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return principal.toString();
    }

    @PostMapping("/add")
    public ResponseEntity<ApiResponse<Transaction>> addTransaction(
            @RequestBody TransactionRequest request) {

        String userId = getCurrentUserId();
        Transaction transaction = walletService.addTransaction(
                userId,
                request.getAmount(),
                request.getCategory());
        return ResponseEntity.ok(ApiResponse.success(transaction, "Transaction added successfully"));
    }

    @GetMapping("/history")
    public ResponseEntity<ApiResponse<List<Transaction>>> getHistory() {

        String userId = getCurrentUserId();
        log.info("Fetching transaction history for user: {}", userId);
        List<Transaction> history = walletService.getTransactionHistory(userId);
        return ResponseEntity.ok(ApiResponse.success(history, "Transaction history fetched successfully"));
    }

    @GetMapping("/wallet")
    public ResponseEntity<ApiResponse<Wallet>> getWallet() {

        String userId = getCurrentUserId();
        Wallet wallet = walletService.getWallet(userId);
        return ResponseEntity.ok(ApiResponse.success(wallet, "Wallet details fetched successfully"));
    }
}
