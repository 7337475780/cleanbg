# Oracle Cloud Always Free Deployment Guide

This guide covers deploying CleanBG to an Oracle Cloud Ampere A1 (ARM64) instance.

## 1. Create Oracle VM
1. Go to Oracle Cloud Console -> **Compute** -> **Instances**.
2. Click **Create Instance**.
3. **Image**: Select **Ubuntu 22.04** (Canonical).
4. **Shape**: Select **Ampere (ARM) VM.Standard.A1.Flex** (up to 4 OCPUs, 24GB RAM).
5. **Boot Volume**: 50GB to 200GB.
6. **SSH Keys**: Download your private key or paste your public key.
7. Click **Create**.

## 2. Open Firewall Ports
1. Go to your instance details -> Click the attached **Subnet** -> Default Security List.
2. Add Ingress Rules for:
   - Port `80` (TCP, `0.0.0.0/0`)
   - Port `443` (TCP, `0.0.0.0/0`)

## 3. Server Setup (SSH into VM)
SSH into your instance:
```bash
ssh -i your-key.key ubuntu@<YOUR_PUBLIC_IP>
```

Open iptables on Ubuntu:
```bash
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 443 -j ACCEPT
sudo netfilter-persistent save
```

## 4. Install Docker & Git
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
newgrp docker
```

## 5. Clone and Configure
```bash
git clone <YOUR_REPO_URL> cleanbg
cd cleanbg
chmod +x scripts/*.sh

cp .env.production.example .env.production
cp backend/.env.production.example backend/.env.production
```
Edit both files and insert your secure passwords and IP/Domain.

## 6. Deploy
```bash
./scripts/deploy.sh
```
Check health:
```bash
./scripts/healthcheck.sh
```

## 7. Adding SSL (Cloudflare)
The easiest way to get SSL is using Cloudflare.
1. Add your domain to Cloudflare.
2. Point an `A` record to your Oracle Public IP.
3. In Cloudflare, set SSL/TLS mode to **Flexible** or **Full**.
4. Nginx is already listening on port 80/443 and will route traffic seamlessly.
