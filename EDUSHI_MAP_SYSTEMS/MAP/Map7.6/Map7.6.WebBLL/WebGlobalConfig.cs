�}G� r �  <��������a	��2��^N��ꬩ>4|�����s��Z"�R���T���q�邾Fھ�����UD%�I�p$	I.�t��o����H~~�������!X���i (�VM��%hX�  3Щy�U�$�q=a�����H�>�A�q�Ó+0��y�������H��D�S������V �� H4ͷ�決���A��!��	�k�9����Y5�V6D���y�= ?�Я��u��I�n.�@^���T������w��!:Q�
H2s`$��q9�`�����E�`��Q�9��q0�-c4T*H6r�V�������v���Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�
            }
        }


        /// <summary>
        /// 获取页卡数据缓存时间
        /// </summary>
        public static int PageCardDataCacheTime
        {
            get
            {
                return System.Configuration.ConfigurationManager.AppSettings["PageCardDataCacheTime"] == null ? 0 : Convert.ToInt32(System.Configuration.ConfigurationManager.AppSettings["PageCardDataCacheTime"]);
            }
        }
    }
}
