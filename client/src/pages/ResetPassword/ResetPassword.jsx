import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../service/axiosInstance";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Check for invalid token
  if (!token) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient"
           style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
        <div className="card shadow-lg border-0 rounded-4 text-center p-5" style={{maxWidth: '400px', width: '100%'}}>
          <div className="bg-gradient position-absolute top-0 start-0 end-0" 
               style={{height: '4px', background: 'linear-gradient(90deg, #667eea, #764ba2)'}}></div>
          
          <i className="bi bi-exclamation-triangle-fill text-warning fs-1 mb-3"></i>
          <h2 className="h4 fw-bold text-dark mb-3">Invalid Reset Link</h2>
          <p className="text-muted mb-4">
            The password reset link is invalid or has expired.
          </p>
          <button 
            className="btn btn-lg btn-outline-secondary rounded-3 px-4"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      alert("All fields required");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`/auth/password/reset?token=${token}&newPassword=${password}`);
      alert("Password reset successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-gradient"
         style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <div className="card shadow-lg border-0 rounded-4 overflow-hidden" style={{maxWidth: '420px', width: '100%'}}>
        {/* Gradient top bar */}
        <div className="bg-gradient position-absolute top-0 start-0 end-0" 
             style={{height: '4px', background: 'linear-gradient(90deg, #667eea, #764ba2)'}}></div>
        
        <div className="card-body p-5 p-md-4">
          {/* Header */}
          <div className="text-center mb-4">
            <div className="mx-auto mb-4 d-flex align-items-center justify-content-center rounded-4 p-3"
                 style={{width: '80px', height: '80px', background: 'linear-gradient(135deg, #667eea, #764ba2)', boxShadow: '0 10px 30px rgba(102,126,234,0.4)'}}>
              <i className="bi bi-shield-lock-fill text-white fs-1"></i>
            </div>
            <h1 className="h2 fw-bold mb-2 lh-1-2" 
                style={{background: 'linear-gradient(135deg, #1e293b, #334155)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
              Reset Password
            </h1>
            <p className="text-muted mb-0">
              Enter your new password below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleReset}>
            <div className="mb-3">
              <label className="form-label fw-semibold text-dark mb-2">New Password</label>
              <div className="position-relative">
                <i className="bi bi-lock-fill position-absolute top-50 start-0 translate-middle-y ms-3 text-muted fs-5"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-lg ps-5 rounded-3 border-2 shadow-sm"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{backgroundColor: '#fafbfc', borderColor: '#e2e8f0'}}
                  required
                />
                <button
                  type="button"
                  className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{boxShadow: 'none'}}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold text-dark mb-2">Confirm Password</label>
              <div className="position-relative">
                <i className="bi bi-lock-fill position-absolute top-50 start-0 translate-middle-y ms-3 text-muted fs-5"></i>
                <input
                  type={showConfirm ? "text" : "password"}
                  className="form-control form-control-lg ps-5 rounded-3 border-2 shadow-sm"
                  placeholder="Confirm new password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  style={{backgroundColor: '#fafbfc', borderColor: '#e2e8f0'}}
                  required
                />
                <button
                  type="button"
                  className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{boxShadow: 'none'}}
                >
                  <i className={`bi ${showConfirm ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-lg w-100 rounded-3 fw-semibold shadow-lg mb-3"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Resetting Password...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="text-center">
            <p className="text-muted mb-0 small">
              <a href="/login" className="text-decoration-none fw-semibold" style={{color: '#5973e5'}}>
                ← Back to Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
