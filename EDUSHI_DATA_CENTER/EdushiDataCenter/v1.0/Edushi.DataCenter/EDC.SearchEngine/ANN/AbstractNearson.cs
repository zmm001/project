�}�� r l  ��Q�sɔ���a	���+�����AMǸ�j�$G��t�R��PW���W ��O),�tD�e�fE*�:Q���,rk=$<�8o��c���P-��$�uv�o0��S.56�2ED[���N���"6^_pW����3f,�1N��`'�i�8��/כ�L��Z�m��&����ب�P��t���q�=;Bu�T�;��	<���p;6�'�hͳ�骽Ŷ�  ����m��.�ߜ��&�(���A��W�9}��D���.��J�fyx#.�/y���H}�6�e%�Ƿ;Dy�x��t�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�       set;
        }

        public virtual uint ID
        {
            get;
            set;
        }

        public virtual double OutputValue
        {
            get;
            set;
        }

        public virtual double OutputDelta
        {
            get;
            set;
        }

        public abstract void Recalc();

        public abstract void UseRecalculatedValue();

        #endregion
    }
}
