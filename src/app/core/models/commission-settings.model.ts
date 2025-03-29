export interface RoleSetting {
    commission_percentage: number;
    hourly_rate: number;
  }
  
  export interface UserOverrideSetting {
    commission_percentage: number;
    hourly_rate: number;
    override_role: boolean;
  }
  
  export interface CommissionSettings {
    roles: { [roleId: string]: RoleSetting };
    users: { [userId: string]: UserOverrideSetting };
  }