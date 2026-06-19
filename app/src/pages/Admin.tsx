import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import {
  Users,
  Shield,
  Mail,
  Calendar,
  ArrowLeft,
  Crown,
  User as UserIcon,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { trpc } from '@/providers/trpc';
import { Button } from '@/components/ui/button';

export default function Admin() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
    if (!isLoading && isAuthenticated && user?.role !== 'admin') {
      navigate('/');
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  const { data: users, isLoading: usersLoading } = trpc.admin.users.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const totalUsers = users?.length ?? 0;
  const adminCount = users?.filter((u) => u.role === 'admin').length ?? 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/')}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                Admin Dashboard
              </h1>
              <p className="text-xs text-gray-500">Manage users and monitor activity</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass rounded-lg px-3 py-1.5 flex items-center gap-2">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">{user?.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{totalUsers}</div>
                <div className="text-xs text-gray-500">Total Users</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Crown className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{adminCount}</div>
                <div className="text-xs text-gray-500">Admins</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-xl p-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {totalUsers - adminCount}
                </div>
                <div className="text-xs text-gray-500">Regular Users</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-xl overflow-hidden"
        >
          <div className="p-5 border-b border-white/5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              All Users
            </h2>
          </div>

          {usersLoading ? (
            <div className="p-8 text-center">
              <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                      User
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                      Email
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                      Role
                    </th>
                    <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-5 py-3">
                      Joined
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((u, i) => (
                    <motion.tr
                      key={u.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                            {u.name?.[0]?.toUpperCase() || 'U'}
                          </div>
                          <span className="text-sm text-gray-200 font-medium">
                            {u.name || 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Mail className="w-3.5 h-3.5" />
                          {u.email || 'N/A'}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                            u.role === 'admin'
                              ? 'bg-yellow-500/10 text-yellow-400'
                              : 'bg-purple-500/10 text-purple-400'
                          }`}
                        >
                          {u.role === 'admin' ? (
                            <Crown className="w-3 h-3" />
                          ) : (
                            <UserIcon className="w-3 h-3" />
                          )}
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-3.5 h-3.5" />
                          {u.createdAt
                            ? new Date(u.createdAt).toLocaleDateString()
                            : 'N/A'}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
