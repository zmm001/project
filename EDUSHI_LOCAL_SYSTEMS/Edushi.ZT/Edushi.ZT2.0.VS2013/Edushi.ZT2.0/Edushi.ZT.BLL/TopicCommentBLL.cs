�}V� r �!  ����k���a	����px�<�t����\��L̷s�4(4\��O>1���ۄg�J���jH'�^L��;�Õ�8�� �� }m =j�B2,��!E����3:�����A��*7���Dh#.g�A����H.�%*�N۳r9x�h4	�����)�Z�>"����h��[��)�*��dt6����_Qa�@�4*��r�w��*<+�����|	��[�����m��z�3I>��vd����l��u�mw����&+����7<O*��,uj��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�,na]_9-��u�����s"��}(����G��帖� �a�K�/b.ӖZ�����+��얎���$TpZ�U�[�����'�?�ִ�Z �����/����ՠQ:�0^F^�a�L�H����R{��	�i�^(HMd�2��E5Ә_E�v�[��o��r���'��AJb*�x	WL����O�]�t]߭wJ1UeH9�����`*���U��S�h�p�h+�!?^�,"\S�z��h���j�8���B�ç�aLB㊑dm���b��	���SJ��_Ƴ&������ߢ�&A	����ld
��d�>K���q}z~8�h�����v�ɵ�*�������@���8�T	�y-j�:۾�j�.C��?R"\x�Ix}��sn�����w՚Qf�~����N�Ӗ��T��N��h�[�F�Hy:�/��=)j�^�
�Qy��b�j
��EaMvJEL\Md���K��TY��RL\�WzSf�M��	?c���CH�HNl�"+|�q"l�S5��� Y�ܪtF:F�x'�5�l�i:�#Nr�k1����2����G(��(WB�����f`rT2՗j	az�4+��;xQ{�'ea��jR�jا1(���q��"��������4�ܐ����G,�Q'p:���M�#[����]�����\$����t�9s���D��Rh��k��(K�4��4�#dR��(�d�&�|�뇑������ow?��7R��~N�睆��'��F�#O��5��#-?�]��;jO@M�v�Y�Ե�П����;Z�,�t���i�ʨx���q��a�)��o��Q��,�ɼ߯� 3�(*�.�Q߲��z�!dt(L��^_�z4��O{�J��s��~e�_y�O��R���36w��V�@e�/�j�\�7׍E@U#H�M��{ʭT0���#mW�vف��zL⍫��/sI������K���Dଥ��pf� <�.RP6�(@=e���T[A�4����}$Q���3�l�.��B#��zR�ZY�B���[�l�k�)�I���f�%���lFA���|Q%E�~	R�,��c���t��4�^��A�`���k�S7yu��<��՝$Ֆ��mيM֑��51�p���Xy?���( ��'õ�l)�7�;��Na�v"/��=T����I06�<;�+2
�<l(��K �,f(|,$n�F�}��
���ݐAk_�I�2���	�$� &qI�#�Q!�{�D���S�@0�`l[�f��e�m)����<���爞=Ŋt��դ��%��#"�-��� yþu����=���ի���@�ߡb��a99`K'$�0<��<x��)�)Ug	N��<�3��0:���b�L��ɠ��}a
����΁^��~�
�g]���{H+�>�7�����ʟ���o����;�W_�x���j�N�Fe>�om��өs���sW�e�B��E8�3%�;0�#�Eyk��Fe�Olļ��lS�Q�ݚ�����f���|l$R�&�k�(	I���hfժ ������C08���"%���\��"i��e�۔D��z��HL�W?>�sE�.�;�F����<WB��B��{g�a��7'3x��~���.���?v�x99�I�*T�$<8�E59�8c� ���y&b�+!�s��i
3�<��W#Ԉ2:�j'�w�r�&� �4F�77�D��14U��!I֤�yG�=>}��G�
-���>��4+����fJ7��I���&�������r�o��f$b�!�)' ��t�&��ٷ�vRH��˹���ۢV�;���ݵ���Du��3�=3(����B���{�5�4�/{Z�㯨�fz�����ML�Da��	����<I�\]�$M�%`��xܙ)������}u~�ޯ�f�ro�Vf߸�.�wʶ�����(ǥ�@�����Z�?Zo^�r����|��)���أ�a��
 �1�����#�����5���A����O`4�C���]bM�D�59n��~���
            object objType = new DataAccess().CreateObject("TopicCommentDAL");//创建TopicCommentDAL的实例
            return objType == null ? new List<TopicCommentModel>() : ((ITopicCommentDAL)objType).GetTopicCommentList(T_ID, iPageSize, iCurrPageIndex, ref totalCount, source);
        }
        #endregion
    }
}
